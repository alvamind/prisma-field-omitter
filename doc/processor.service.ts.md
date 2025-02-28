import { Project, Node, PropertySignature, TypeAliasDeclaration, InterfaceDeclaration, ModuleDeclaration, SourceFile, TypeNode } from "ts-morph";
import Alvamind from 'alvamind';
import { Glob } from "bun";
import type { Config } from '../types';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';
import { basename, join } from 'path';
import type { ProcessingStats } from './stats.service';

export const processorService = Alvamind({ name: 'processor.service' })
  .decorate('processorService', {
    createProject: () => new Project({
      tsConfigFilePath: "tsconfig.json",
      skipAddingFilesFromTsConfig: true,
    }),

    matchesPattern: (value: string, patterns: string[]): boolean => {
      return patterns.some(pattern => {
        const isNegated = pattern.startsWith('!');
        const actualPattern = isNegated ? pattern.slice(1) : pattern;
        const matches = new Glob(actualPattern).match(value);
        return isNegated ? !matches : matches;
      });
    },

    getTargetPatterns: (config: Config): string[] => {
      return config.hide.flatMap(rule =>
        Array.isArray(rule.target) ? rule.target :
          rule.target === 'all' ? ['*'] : [rule.target || '*']
      );
    },

    shouldProcessProperty: (
      prop: PropertySignature,
      typeName: string,
      config: Config
    ): boolean => {
      return config.hide.some(rule =>
        self.matchesPattern(typeName, self.getTargetPatterns(config)) &&
        self.matchesPattern(prop.getName(), Array.isArray(rule.field) ? rule.field : [rule.field])
      );
    },

    processProperties: (
      properties: PropertySignature[],
      typeName: string,
      config: Config,
      shouldProcessProperty: (prop: PropertySignature, typeName: string) => boolean
    ): number => {
      const toModify = properties.filter(prop =>
        !prop.wasForgotten() &&
        Node.isPropertySignature(prop) &&
        shouldProcessProperty(prop, typeName)
      );

      toModify.forEach(prop => {
        if (prop.wasForgotten()) return;
        const text = prop.getText();
        config.action === 'delete'
          ? prop.remove()
          : prop.replaceWithText(text.split('\n').map(line => `// ${line}`).join('\n'));
      });

      return toModify.length;
    },

    getInputFiles: async (patterns: string[]): Promise<string[]> => {
      const seenFiles = new Set<string>();
      const results: string[] = [];

      for (const pattern of patterns) {
        // Handle both absolute and relative paths
        const absolutePattern = pattern.startsWith('/')
          ? pattern
          : join(process.cwd(), pattern);

        // Check if the pattern is a direct file path
        if (existsSync(absolutePattern)) {
          if (!seenFiles.has(absolutePattern)) {
            seenFiles.add(absolutePattern);
            results.push(absolutePattern);
          }
          continue;
        }

        // Process glob pattern
        const globPattern = pattern.startsWith('/')
          ? pattern
          : join(process.cwd(), pattern);

        for await (const file of new Glob(globPattern).scan({ absolute: true })) {
          if (!seenFiles.has(file)) {
            seenFiles.has(file);
            results.push(file);
          }
        }
      }

      return results;
    },

    processNestedProperties: (
      node: Node,
      typeName: string,
      config: Config,
      depth: number = 0
    ): number => {
      let count = 0;
      if (node.wasForgotten() || depth >= 3) return count;

      if (Node.isTypeLiteral(node)) {
        const properties = node.getProperties()
          .filter((p): p is PropertySignature => Node.isPropertySignature(p) && !p.wasForgotten());

        const toModify = properties.filter(prop =>
          !prop.wasForgotten() && self.shouldProcessProperty(prop, typeName, config)
        );

        toModify.forEach(prop => {
          if (prop.wasForgotten()) return;
          const text = prop.getText();
          if (config.action === "delete") {
            prop.remove();
          } else {
            prop.replaceWithText(text.split("\n").map(line => `// ${line}`).join("\n"));
          }
          count++;
        });

        // Process next level
        properties.forEach(prop => {
          if (prop.wasForgotten()) return;
          const propTypeNode = prop.getTypeNode();
          if (propTypeNode && !propTypeNode.wasForgotten()) {
            count += self.processNestedProperties(propTypeNode, typeName, config, depth + 1);
          }
        });
      } else if (Node.isTypeReference(node)) {
        // Handle Prisma.AtLeast type
        const typeRef = node.getType().getText();
        if (typeRef.startsWith('Prisma.AtLeast<')) {
          const typeArgs = node.getTypeArguments();
          if (typeArgs.length > 0) {
            // Process the first type argument which contains the object type
            count += self.processNestedProperties(typeArgs[0], typeName, config, depth + 1);
          }
        } else {
          // Process other type references as before
          const typeArgs = node.getTypeArguments();
          typeArgs.forEach(arg => {
            if (!arg.wasForgotten()) {
              count += self.processNestedProperties(arg, typeName, config, depth + 1);
            }
          });
        }
      }
      return count;
    },

    extractProperties: (decl: TypeAliasDeclaration | InterfaceDeclaration | ModuleDeclaration): PropertySignature[] => {
      switch (true) {
        case Node.isTypeAliasDeclaration(decl): {
          const typeNode = decl.getTypeNode();
          return (typeNode && Node.isTypeLiteral(typeNode))
            ? typeNode.getProperties().filter(Node.isPropertySignature)
            : [];
        }
        case Node.isInterfaceDeclaration(decl):
          return decl.getProperties().filter(Node.isPropertySignature);
        default:
          return [];
      }
    },

    processDeclaration: (
      decl: TypeAliasDeclaration | InterfaceDeclaration | ModuleDeclaration,
      config: Config,
      stats: ProcessingStats
    ): void => {
      // Check if declaration has export modifier
      if (!decl.isExported()) return;

      const name = decl.getName();
      if (!name || !self.matchesPattern(name, self.getTargetPatterns(config))) return;

      // Handle nested declarations in namespaces
      if (Node.isModuleDeclaration(decl)) {
        const body = decl.getBody();
        if (body && Node.isModuleBlock(body)) {
          const statements = body.getStatements();
          statements.forEach(statement => {
            if ((Node.isTypeAliasDeclaration(statement) || Node.isInterfaceDeclaration(statement))
              && statement.isExported()) {
              self.processDeclaration(statement, config, stats);
            }
          });
        }
        return;
      }

      const properties = self.extractProperties(decl);
      if (properties.length === 0) return;

      const boundShouldProcessProperty = (prop: PropertySignature, typeName: string) =>
        self.shouldProcessProperty(prop, typeName, config);

      const modifiedCount = self.processProperties(properties, name, config, boundShouldProcessProperty);
      if (modifiedCount > 0) {
        stats.typesModified++;
        stats.fieldsModified += modifiedCount;
      }

      // Modify this part to only process direct properties
      properties
        .filter(prop => !prop.wasForgotten())
        .forEach(prop => {
          const typeNode = prop.getTypeNode();
          if (typeNode && !typeNode.wasForgotten() &&
            (Node.isTypeLiteral(typeNode) ||
              (Node.isTypeReference(typeNode) && !typeNode.getTypeName().getText().includes('Promise')))) {
            const nestedCount = self.processNestedProperties(typeNode, name, config, 0);
            if (nestedCount > 0) {
              stats.fieldsModified += nestedCount;
            }
          }
        });
    },

    processFile: async (
      file: string,
      config: Config,
      stats: ProcessingStats,
      logger: { info: (msg: string) => void, warn: (msg: string) => void }
    ) => {
      const sourceFile = self.createProject().addSourceFileAtPath(file);
      const outputPath = join(config.outputDir, basename(file));
      const relativeOutputPath = outputPath.replace(process.cwd() + '/', '');

      // Process file only if we haven't processed it before
      if (!stats.processedFiles) {
        stats.processedFiles = new Set();
      }

      if (!stats.processedFiles.has(file)) {
        stats.processedFiles.add(file);
        logger.info(`📝 Output: ${relativeOutputPath}`);

        // Filter for exported declarations only
        const isExported = (node: TypeAliasDeclaration | InterfaceDeclaration | ModuleDeclaration): boolean =>
          node.isExported();

        [
          ...sourceFile.getTypeAliases().filter(isExported),
          ...sourceFile.getInterfaces().filter(isExported),
          ...sourceFile.getModules().filter(isExported)
        ].forEach(decl => self.processDeclaration(decl, config, stats));

        await Bun.write(outputPath, sourceFile.getFullText());
        stats.filesProcessed++;

        if (config.deleteOriginFile) {
          try {
            await unlink(file);
          } catch (error) {
            logger.warn(`Failed to delete original file: ${file}`);
          }
        }
      }
    }
  });

const self = processorService.processorService;
