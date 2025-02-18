import Alvamind from 'alvamind';
import { Project, Node, PropertySignature } from "ts-morph";
import { Glob } from "bun";
import type { Config } from '../types';
import { existsSync } from 'fs';

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
    ) => {
      let count = 0;
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
        count++;
      });
      return count;
    },

    getInputFiles: async (patterns: string[]): Promise<string[]> => {
      const fileArrays = await Promise.all(
        patterns.map(async pattern => {
          const results: string[] = [];
          // Check if the pattern is a direct file path
          if (existsSync(pattern)) {
            results.push(pattern);
          }
          // Process glob pattern even if it's a valid path to include more matches
          for await (const file of new Glob(pattern).scan({ absolute: true })) {
            if (!results.includes(file)) {
              results.push(file);
            }
          }
          return results;
        })
      );
      return Array.from(new Set(fileArrays.flat()));
    },

    processNestedProperties: (
      node: Node,
      typeName: string,
      config: Config
    ): number => {
      let count = 0;
      if (node.wasForgotten()) return count;

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

        properties.forEach(prop => {
          if (prop.wasForgotten()) return;
          const propTypeNode = prop.getTypeNode();
          if (propTypeNode && !propTypeNode.wasForgotten() &&
            (Node.isTypeLiteral(propTypeNode) || Node.isTypeReference(propTypeNode))) {
            count += self.processNestedProperties(propTypeNode, typeName, config);
          }
        });
      } else if (Node.isTypeReference(node)) {
        const typeArgs = node.getTypeArguments();
        typeArgs.forEach(arg => {
          if (!arg.wasForgotten()) {
            count += self.processNestedProperties(arg, typeName, config);
          }
        });
      }
      return count;
    }
  });

const self = processorService.processorService;
