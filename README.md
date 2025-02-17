# Prisma Field Omitter

A tool to automatically hide or remove fields from Prisma-generated TypeScript types.

## Installation

```bash
npm install prisma-field-omitter
```

## Usage

### CLI

```bash
npx prisma-field-omitter --origin "./prisma/**/*.ts" --output "./generated" --action comment
```

Options:
- `--origin`: Source TypeScript file(s) path or glob pattern
- `--output`: Output directory for modified files
- `--action`: Action to take (`comment` or `delete`)
- `--delete-origin`: Delete original files after processing

### Programmatic Usage

```typescript
import { process } from 'prisma-field-omitter';

await process({
  originFile: './prisma/**/*.ts',
  outputDir: './generated',
  action: 'comment',
  deleteOriginFile: false,
  hide: [
    {
      target: ['User', 'Profile'],
      field: ['password', 'secretField']
    }
  ]
});
```

## Configuration

The tool accepts the following configuration options:

- `originFile`: String or array of strings specifying the input files (supports glob patterns)
- `outputDir`: Directory where modified files will be saved
- `action`: Either 'comment' or 'delete' to specify how to handle matched fields
- `deleteOriginFile`: Boolean indicating whether to delete original files after processing
- `hide`: Array of rules specifying which fields to hide in which types

## License

MIT
