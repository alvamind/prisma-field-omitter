# ✨ prisma-field-omitter ✨

[![npm version](https://img.shields.io/npm/v/prisma-field-omitter.svg)](https://www.npmjs.com/package/prisma-field-omitter)
[![License](https://img.shields.io/npm/l/prisma-field-omitter.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/alvamind/prisma-field-omitter/main.yml?branch=main)](REPLACE_WITH_YOUR_GITHUB_ACTIONS_LINK)
[![Coverage Status](https://coveralls.io/repos/github/alvamind/prisma-field-omitter/badge.svg?branch=main)](REPLACE_WITH_YOUR_COVERALLS_LINK)
[![Downloads](https://img.shields.io/npm/dm/prisma-field-omitter)](https://www.npmjs.com/package/prisma-field-omitter)

> 🚀 **Effortlessly hide or remove fields from your Prisma-generated TypeScript types.**

`prisma-field-omitter` is a command-line tool (and library) that modifies your Prisma-generated TypeScript files, allowing you to selectively **hide (comment out)** or **remove** fields from your types (interfaces and type aliases). This is incredibly useful for:

*   **Separating Input and Output Types:** Create distinct types for creating/updating data (input) and retrieving data (output), avoiding exposing sensitive fields or internal IDs.
*   **Customizing API Responses:** Tailor your API responses by removing unnecessary or sensitive data from your models before sending them to clients.
*   **Data Sanitization:** Easily remove fields that should not be exposed in certain contexts.
*   **Simplifying Development:** Work with cleaner, more focused types, improving code readability and reducing potential errors.

It supports powerful **glob patterns** for both file selection and field/type targeting, giving you fine-grained control over the transformation process.

**Key Features:**

*   📝 **Configuration-Driven:** Operates based on a JSON configuration file (`.json`), making it easy to manage and reuse your hiding rules across projects.
*   🎯 **Flexible Targeting:** Hide fields based on type names *and* field names using glob patterns. Supports targeting *all* types with a simple `"all"` keyword.
*   💬/🗑️ **Comment or Delete:** Choose to either **comment out** the targeted fields (preserving them for reference) or **delete** them completely.
*   📁 **File Management:** Processes multiple files at once based on flexible glob patterns.  Optionally **deletes** the original files after successful processing (use with care!).
*   ✅ **Validation:**  Rigorously validates your configuration file against a JSON schema to prevent common errors and ensure your configuration is correct.
*   ⏳ **Progress Feedback:** Displays a clear, concise progress bar during processing, so you know what's happening.
*   🟦 **TypeScript Support:** Built with TypeScript and fully supports TypeScript projects, providing type safety and autocompletion.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
    -   [Basic Example](#basic-example)
    -   [Advanced Usage](#advanced-usage)
    -   [Programmatic Usage](#programmatic-usage)
-   [Configuration](#configuration)
    -   [`originFile`](#originfile)
    -   [`outputDir`](#outputdir)
    -   [`deleteOriginFile`](#deleteoriginfile)
    -   [`action`](#action)
    -   [`generateOmitTypes` and `generatedOmitTypesOutputPath`](#generateomittypes-and-generatedomittypesoutputpath)
    -   [`hide`](#hide)
        -   [`field`](#field)
        -   [`target`](#target)
        -   [`on`](#on)
-   [API Reference](#api-reference)
-   [FAQ](#faq)
-   [Contributing](#contributing)
-   [License](#license)
-   [Author](#author)

## Installation

```bash
npm install -g prisma-field-omitter
# or
yarn global add prisma-field-omitter
# or, using Bun:
bun add -g prisma-field-omitter
```

## Usage

### Basic Example

1.  **Create a configuration file** (e.g., `prisma-omitter.config.json`):

    ```json
    {
      "originFile": "src/**/*.ts",
      "outputDir": "src-modified",
      "hide": [
        {
          "field": "*At",
          "target": "all"
        },
        {
          "field": "password",
          "target": ["User"]
        }
      ],
      "action": "comment"
    }
    ```

    This configuration will:

    *   Process all `.ts` files within the `src` directory and its subdirectories (recursively!).
    *   Output the modified files to a new `src-modified` directory.
    *   **Comment out** all fields ending with "At" (like `createdAt`, `updatedAt`) in *all* your TypeScript types.
    *   **Comment out** the `password` field *only* in the `User` type (interface or type alias).
    *   Uses the `comment` action (so it won't delete anything, just add comments).

2.  **Run the tool:**

    ```bash
    prisma-field-omitter --config prisma-omitter.config.json
    ```

### Advanced Usage

1.  **More Complex Configuration (with exclusions, deletion, and `on` option):**

    ```json
    {
      "originFile": ["src/models/*.ts", "!src/models/ignored.ts"],
      "outputDir": "generated",
      "deleteOriginFile": true,
      "action": "delete",
      "hide": [
        {
          "field": ["id", "*At"],
          "target": "all",
          "on": "output"
        },
        {
          "field": "email",
          "target": "UserCreateInput",
          "on": "input"
        }
      ]
    }
    ```
    *   `originFile`: Uses an array to *include* all `.ts` files in `src/models/` but *exclude* `src/models/ignored.ts`.
    *   `deleteOriginFile`: Set to `true` – this will **permanently delete** the original files after processing!  Make sure you have backups or version control!
    *   `action`: Set to `delete` to completely remove the fields.
    *   `hide`:  Demonstrates the `on` option:
        *   The first rule hides `id` and fields ending in `At` on all *output* types.
        *   The second rule hides the `email` field *only* on the `UserCreateInput` *input* type.

### Programmatic Usage

You can also use `prisma-field-omitter` directly within your TypeScript (or JavaScript) code:

```typescript
// my-script.ts
import { run } from 'prisma-field-omitter';

async function main() {
  try {
    await run({ configPath: 'prisma-omitter.config.json' });
    console.log('✅ Successfully processed files!');
  } catch (error) {
    console.error('❌ An error occurred:', error);
  }
}

main();
```

Then, run your script:

```bash
bun my-script.ts
# or, if you're not using Bun:
# ts-node my-script.ts  (if you have ts-node installed)
# node my-script.js     (if you've compiled your TypeScript to JavaScript)
```

## Configuration

The configuration file is a JSON file (e.g., `prisma-omitter.config.json`) that dictates how `prisma-field-omitter` operates.  Here's a detailed breakdown:

### `originFile`

*   **Type:** `string | string[]`
*   **Required:** Yes
*   **Description:**  Specifies the input TypeScript files to process, using [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming)). This allows for very flexible file selection.
*   **Examples:**
    *   `"src/**/*.ts"`:  Processes all `.ts` files in the `src` directory and all its subdirectories.
    *   `"src/models/*.ts"`: Processes all `.ts` files directly within the `src/models` directory.
    *   `["src/models/*.ts", "!src/models/excludeMe.ts"]`:  Processes all `.ts` files in `src/models` *except* `excludeMe.ts`.
    *   `"src/models/User.ts"`: Processes only the file `src/models/User.ts`.

### `outputDir`

*   **Type:** `string`
*   **Required:** Yes
*   **Description:** The directory where the processed (modified) files will be written. The directory will be created if it doesn't exist.
*   **Example:** `"dist/modified-types"`

### `deleteOriginFile`

*   **Type:** `boolean`
*   **Default:** `false`
*   **Required:** No
*   **Description:** If set to `true`, the original input files will be **permanently deleted** after successful processing.  **Use this with extreme caution!**  Make sure you have backups or use version control (like Git).
*   **Example:** `true`

### `action`

*   **Type:** `"comment" | "delete"`
*   **Default:** `"comment"`
*   **Required:** No
*   **Description:** Determines how the targeted fields are handled:
    *   `"comment"`:  Adds a `//` at the beginning of each line of the field's definition, effectively commenting it out.
    *   `"delete"`:  Removes the field's definition entirely from the type.
*   **Example:** `"delete"`

### `generateOmitTypes` and `generatedOmitTypesOutputPath`

* **`generateOmitTypes`**
    * **Type:** `boolean`
    *   **Default:** `false`
    * **Required:** No
    *   **Description:** Generate Typescript types that omit the hidden field, if it sets `true`.

* **`generatedOmitTypesOutputPath`**
    *   **Type:** `string`
    * **Required:** if `generatedOmitTypes` is `true`
    *   **Description:** Output path of generated Typescript types that omit the hidden field.

### `hide`

*   **Type:** `HideRule[]` (an array of `HideRule` objects)
*   **Required:** Yes
*   **Description:**  This is the core of the configuration.  It's an array of rules, each specifying *which* fields to hide and *where* to hide them.

Each `HideRule` object has the following properties:

#### `field`

*   **Type:** `string | string[]`
*   **Required:** Yes
*   **Description:**  The name(s) of the field(s) to hide, or a glob pattern matching field names.
*   **Examples:**
    *   `"password"`: Hides the field named exactly "password".
    *   `"*At"`: Hides any field ending with "At" (e.g., `createdAt`, `updatedAt`).
    *   `["id", "email", "*Token"]`: Hides fields named "id", "email", and any field ending with "Token".

#### `target`

*   **Type:** `"all" | string[]`
*   **Required:** No
*   **Default:** (Effectively `"*"` if not specified)
*   **Description:** Specifies the *types* (interfaces or type aliases) where the `field` should be hidden.
*   **Examples:**
    *   `"all"`:  Hides the field(s) in *all* types within the processed files.
    *   `["User", "Product"]`: Hides the field(s) only in types named "User" and "Product".
    *   `"*Input"`:  Hides the field(s) in all types ending with "Input" (e.g., `UserCreateInput`, `ProductUpdateInput`).
    * `["User", "!UserOutput"]`: Hides the specified fields in 'User', but *not* in `UserOutput`.

#### `on`

*   **Type:** `"input" | "output" | "both"`
*   **Default:** `"both"`
*   **Required:** No
*   **Description:**  Further refines *where* the field should be hidden, specifically targeting input or output types (or both). This is particularly useful when you have naming conventions for input and output types (e.g., suffixing input types with `Input`).
*   **Examples:**
    *   `"input"`: Hides the field(s) only in types that are likely to be *input* types (you'll need to combine this with a `target` pattern, like `"*Input"`).
    *   `"output"`: Hides the field(s) only in types that are likely to be *output* types.
    *   `"both"`: Hides the field(s) in both input and output types (this is the default behavior).

## API Reference

The main export of the library is the `run` function:

### `run(options: ProcessingOptions): Promise<boolean>`

Executes the field omission process based on the provided options.

**Arguments:**

*   `options` (`ProcessingOptions`): An object containing:
    *   `configPath` (`string`, **required**): The path to your JSON configuration file.
    *   `verbose` (`boolean`, *optional*):  If `true`, enables more verbose output during processing.

**Returns:**

*   `Promise<boolean>`:  A promise that resolves to `true` if the process completed successfully, and rejects with an error if something went wrong.

## FAQ

*   **Q: What are glob patterns?**

    **A:** Glob patterns are a way to specify sets of filenames using wildcard characters. For example, `*.ts` matches all files ending in `.ts`.  `src/**/*.ts` matches all `.ts` files in the `src` directory and all its subdirectories.  `!src/ignore.ts` *excludes* the file `src/ignore.ts`.  You can learn more about glob patterns online (search for "glob pattern syntax").

*   **Q: Can I use this library with JavaScript projects?**

    **A:** Yes! While the library is written in TypeScript, it works perfectly fine with JavaScript projects as long as you're working with TypeScript files generated by Prisma. You don't need to write your entire project in TypeScript to use `prisma-field-omitter`.

*   **Q: How does `prisma-field-omitter` know which files are TypeScript files?**

    **A:** It relies on the file extension `.ts`.  It assumes that any file matching your `originFile` glob pattern with a `.ts` extension is a TypeScript file.

*   **Q:  What happens if a field I'm trying to hide doesn't exist in a type?**

    **A:**  Nothing! The library will simply skip that field/type combination and move on.  It won't throw an error.

* **Q: Can I undo the changes?**
  **A:** If you choose comment, yes. If you chose delete, and didn't delete originals, then yes, otherwise **No**. If `deleteOriginFile` is `true`, make *absolutely sure* you have backups or are using version control.  There's no "undo" if you delete the original files. If you chose `"action": "comment"`, the original fields are still there, just commented out.

* **Q: What happens if there is any errors during validation process?**
  **A:** The tool will show the error log on the console, and stop.

*   **Q: Does this library modify my Prisma schema file (`schema.prisma`)?**

    **A:** No, `prisma-field-omitter` *only* modifies the generated TypeScript files. It *does not* interact with your Prisma schema file at all. It operates on the *output* of Prisma's generation process.

*   **Q: Why not mark fields directly in the Prisma schema (e.g., with an attribute like `@hide`)?**

    **A:**  This is a great question!  Prisma, at the time of writing, does not natively support a mechanism for hiding fields at the schema level in a way that would be reflected in the generated TypeScript types.  While you *can* use custom attributes in your Prisma schema, they are primarily intended for Prisma generators to use, and Prisma itself doesn't provide built-in functionality to automatically omit fields from the generated types based on those attributes.

    Here's a breakdown of the reasons why `prisma-field-omitter` exists and why it works the way it does:

    1.  **No Native Prisma Support:** Prisma's core functionality is focused on database interactions and generating a type-safe client. It doesn't inherently offer a way to control the visibility of fields in the generated *TypeScript* types for different contexts (like input vs. output).  There have been feature requests for this, but it's not currently a built-in feature.

    2.  **Flexibility and Context-Specific Control:** `prisma-field-omitter` provides a level of flexibility that would be difficult to achieve solely within the Prisma schema. You might want to:
        *   Hide different fields in different parts of your application.
        *   Have different hiding rules for development, testing, and production.
        *   Hide fields based on dynamic conditions (though this would require re-running `prisma-field-omitter`).
        *   Easily switch between commenting and deleting fields.

        The configuration-file approach allows for these complex scenarios, which would be cumbersome to manage directly within the `schema.prisma` file.

    3.  **Post-Processing Approach:**  `prisma-field-omitter` operates as a *post-processor*. It takes the *output* of `prisma generate` (the TypeScript files) and modifies them according to your rules. This is a common and effective pattern for extending tools without requiring changes to the core tool itself.

    4.  **Potential for Future Prisma Integration:** It's possible that Prisma will eventually add native support for this kind of functionality.  If that happens, `prisma-field-omitter` could potentially be adapted to work *with* Prisma's built-in features, or it might become redundant.  For now, it provides a valuable solution to a common problem.

    In summary, `prisma-field-omitter` fills a gap in Prisma's current feature set by providing a flexible, configuration-driven way to control the shape of your Prisma-generated TypeScript types. It's a post-processing tool that gives you fine-grained control without requiring changes to your Prisma schema.

## Contributing

Contributions are very welcome!  If you find a bug, have a feature request, or want to contribute code, please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## Author

Alvamind