import { configs as perfectionist } from "eslint-plugin-perfectionist";
import tailwindcssPlugin from "eslint-plugin-better-tailwindcss";
import reactCompilerPlugin from "eslint-plugin-react-compiler";
import { configs as tseslintConfigs } from "typescript-eslint";
import eslintComments from "eslint-plugin-eslint-comments";
import testingLibrary from "eslint-plugin-testing-library";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import prettier from "eslint-config-prettier/flat";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import boundaries from "eslint-plugin-boundaries";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import * as mdxPlugin from "eslint-plugin-mdx";
import security from "eslint-plugin-security";
import reactPlugin from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import sonarjs from "eslint-plugin-sonarjs";
import eslintPlugin from "@eslint/js";
import globals from "globals";

// Global ignores configuration
// Must be in its own config object to act as global ignores
const ignoresConfig = defineConfig([
  {
    ignores: [
      ".next/",
      "node_modules/",
      "public/",
      ".vscode/",
      "next-env.d.ts",
    ],
    name: "project/ignores",
  },
]);

const nodeGlobalsConfig = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    files: ["**/*.{js,mjs,cjs}", "eslint.config.mjs"],
    name: "project/node-globals",
  },
]);

// ESLint recommended rules for JavaScript/TypeScript
// Docs: https://www.npmjs.com/package/@eslint/js
const eslintJSConfig = defineConfig([
  {
    name: "project/eslint-js/javascript-recommended",
    files: ["**/*.{js,mjs,ts,tsx}"],
    ...eslintPlugin.configs.recommended,
  },
]);

// TypeScript configuration with type-checked rules
// Docs: https://typescript-eslint.io/
const typescriptConfig = defineConfig([
  {
    rules: {
      // Allow ts-expect-error and ts-ignore with descriptions
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": "allow-with-description",
          minimumDescriptionLength: 3,
          "ts-nocheck": false,
          "ts-check": false,
        },
      ],
      "@typescript-eslint/triple-slash-reference": "off",
      // disabled next rule due to bug:
      // https://github.com/typescript-eslint/typescript-eslint/issues/11732
      // https://github.com/eslint/eslint/issues/20272
      "@typescript-eslint/unified-signatures": "off",
      // Disable rules that conflict with TypeScript's own error checking
      "@typescript-eslint/no-unsafe-call": "off",
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
        tsconfigRootDir: import.meta.dirname,
        // Automatically detects tsconfig.json
        projectService: true,
      },
    },
    extends: [
      ...tseslintConfigs.strictTypeChecked,
      ...tseslintConfigs.stylisticTypeChecked,
    ],
    name: "project/typescript-strict",
    files: ["**/*.{ts,tsx,mjs}"],
  },
  {
    rules: {
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
    files: ["**/*.{test,spec}.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}"],
    name: "project/disable-typescript-eslint-test",
  },
  {
    name: "project/javascript-disable-type-check",
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslintConfigs.disableTypeChecked,
  },
]);

// React and Next.js configuration
const reactConfig = defineConfig([
  {
    rules: {
      // React recommended rules
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      // React Hooks rules (use recommended-latest for latest features)
      ...reactHooksPlugin.configs["recommended-latest"].rules,
      // Accessibility rules (strict mode for better a11y)
      ...jsxA11yPlugin.configs.strict.rules,
      // Next.js recommended rules
      ...nextPlugin.configs.recommended.rules,
      // Next.js Core Web Vitals rules
      ...nextPlugin.configs["core-web-vitals"].rules,

      // Fine-tuned accessibility rules
      "jsx-a11y/alt-text": [
        "warn",
        {
          elements: ["img"],
          img: ["Image"], // Next.js Image component
        },
      ],
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",

      "jsx-a11y/media-has-caption": "warn",
      "react/no-unknown-property": "off", // Conflicts with custom attributes
      "react/jsx-no-target-blank": "off", // Next.js handles this
      // Customizations for modern React/Next.js
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-props": "warn",
      "react/prop-types": "off", // Use TypeScript instead
    },
    plugins: {
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "@next/next": nextPlugin,
      react: reactPlugin,
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
    name: "project/react-next",
    files: ["**/*.{jsx,tsx}"],
  },
]);

// Docs: https://www.jsboundaries.dev/
const jsBoundariesConfig = defineConfig([
  {
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          rules: [
            {
              allow: { to: { type: "shared" } },
              from: { type: "shared" },
            },
            {
              message:
                "[feature/{{from.captured.featureName}}] cannot import from [app]. Features must not depend on the app layer.",
              disallow: {
                to: { type: "app" },
              },
              from: { type: "feature" },
            },
            {
              disallow: {
                to: {
                  captured: {
                    featureName: "!{{from.captured.featureName}}",
                  },
                  type: "feature",
                },
              },
              message:
                "[feature/{{from.captured.featureName}}] cannot import from [feature/{{to.captured.featureName}}]. A feature may import only from itself or from shared.",
              from: { type: "feature" },
            },
            {
              allow: {
                to: [
                  { type: "shared" },
                  {
                    captured: {
                      featureName: "{{ from.captured.featureName }}",
                    },
                    type: "feature",
                  },
                ],
              },
              from: { type: "feature" },
            },
            {
              allow: {
                to: [
                  { type: "shared" },
                  { type: "feature" },
                  { captured: { fileName: "*.css" }, type: "app" },
                ],
              },
              from: { type: "app" },
            },
            {
              allow: {
                to: [{ type: "shared" }, { type: "feature" }],
              },
              from: { type: "neverImport" },
            },
          ],
          message:
            "[{{from.type}}/{{from.captured.featureName}}] cannot import [{{to.type}}/{{to.captured.featureName}}]",
          default: "disallow",
        },
      ],
      "boundaries/no-unknown-files": ["error"],
      "boundaries/no-unknown": ["error"],
    },
    settings: {
      "boundaries/elements": [
        {
          pattern: [
            "src/components/**/*",
            "src/config/**/*",
            "src/contexts/**/*",
            "src/hooks/**/*",
            "src/lib/**/*",
            "src/providers/**/*",
            "src/schemas/**/*",
            "src/store/**/*",
            "src/styles/**/*",
            "src/types/**/*",
            "src/utils/**/*",
          ],
          type: "shared",
          mode: "full",
        },
        {
          pattern: ["src/features/*/**/*"],
          capture: ["featureName"],
          type: "feature",
          mode: "full",
        },
        {
          capture: ["_", "fileName"],
          pattern: ["src/app/**/*"],
          mode: "full",
          type: "app",
        },
        {
          pattern: [
            "src/proxy.ts",
            "src/instrumentation.ts",
            "src/instrumentation-client.ts",
          ],
          type: "neverImport",
          mode: "full",
        },
      ],
      "boundaries/include": ["src/**/*"],
    },
    name: "project/module-boundaries",
    plugins: { boundaries },
  },
]);

const reduxHooksLintConfig = defineConfig([
  {
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              message:
                "Use typed hooks `useAppDispatch` and `useAppSelector` instead.",
              importNames: ["useSelector", "useDispatch"],
              name: "react-redux",
            },
          ],
        },
      ],
      "no-restricted-imports": "off",
    },
    name: "project/redux-hooks",
    files: ["**/*.{ts,tsx}"],
  },
  {
    rules: {
      "@typescript-eslint/no-restricted-imports": "off",
    },
    files: ["src/store/hooks.ts"],
    name: "project/redux-hooks",
  },
]);

// Docs: https://ota-meshi.github.io/eslint-plugin-jsonc
const jsonConfig = defineConfig([
  {
    rules: {
      "jsonc/vue-custom-block/no-parsing-error": "error",
      "jsonc/no-escape-sequence-in-identifier": "error",
      "jsonc/no-hexadecimal-numeric-literals": "error",
      "jsonc/no-unicode-codepoint-escapes": "error",
      "jsonc/no-binary-numeric-literals": "error",
      "jsonc/no-octal-numeric-literals": "error",
      "jsonc/no-irregular-whitespace": "error",
      "jsonc/no-numeric-separators": "error",
      "jsonc/no-binary-expression": "error",
      "jsonc/no-template-literals": "error",
      "jsonc/no-floating-decimal": "error",
      "jsonc/no-bigint-literals": "error",
      "jsonc/no-regexp-literals": "error",
      "jsonc/no-undefined-value": "error",
      "jsonc/no-useless-escape": "error",
      "jsonc/valid-json-number": "error",
      "jsonc/no-parenthesized": "error",
      "jsonc/no-sparse-arrays": "error",
      "jsonc/no-number-props": "error",
      "jsonc/space-unary-ops": "error",
      "no-unused-expressions": "off",
      "jsonc/comma-dangle": "error",
      "jsonc/no-dupe-keys": "error",
      "jsonc/no-multi-str": "error",
      "jsonc/no-plus-sign": "error",
      "jsonc/no-comments": "error",
      "jsonc/no-infinity": "error",
      "jsonc/quote-props": "error",
      "jsonc/no-octal": "error",
      "no-unused-vars": "off",
      "jsonc/no-nan": "error",
      "jsonc/quotes": "error",
      strict: "off",
    },
    files: [
      "*.json",
      "**/*.json",
      "*.json5",
      "**/*.json5",
      "*.jsonc",
      "**/*.jsonc",
    ],
    plugins: {
      jsonc: eslintPluginJsonc,
    },
    name: "project/eslint-eslint-plugin-jsonc",
    language: "jsonc/x",
  },
  {
    files: [".vscode/**/*.json", ".devcontainer/**/*.json"],
    rules: {
      "jsonc/no-comments": "off",
    },
    name: "project/eslint-eslint-plugin-jsonc",
  },
]);

// Docs: https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/
const eslintCommentsConfig = defineConfig([
  {
    rules: {
      "eslint-comments/require-description": [
        "error",
        { ignore: ["eslint-enable"] },
      ],

      "eslint-comments/disable-enable-pair": [
        "error",
        { allowWholeFile: false },
      ],

      "eslint-comments/no-aggregating-enable": "error",

      "eslint-comments/no-duplicate-disable": "error",

      "eslint-comments/no-unlimited-disable": "error",

      "eslint-comments/no-unused-disable": "error",

      "eslint-comments/no-unused-enable": "error",
    },
    plugins: {
      "eslint-comments": eslintComments,
    },
    name: "project/eslint-plugin-eslint-comments",
  },
]);

// Docs: https://www.npmjs.com/package/eslint-plugin-testing-library
const testConfigs = defineConfig([
  {
    files: ["**/__tests__/**/*.{jsx,tsx}"],
    ...testingLibrary.configs["flat/react"],
  },
]);

// Docs: https://perfectionist.dev/
const perfectionistConfigs = defineConfig([
  {
    ...perfectionist["recommended-line-length"],
    name: "perfectionist/recommended-line-length",
  },
]);

// Docs: https://www.npmjs.com/package/eslint-plugin-security
const securityConfig = defineConfig([
  {
    rules: {
      ...security.configs.recommended.rules,
    },
    plugins: {
      security,
    },
    name: "project/eslint-security",
    files: ["**/*.{js,jsx,ts,tsx}"],
  },
]);

// Docs: https://www.npmjs.com/package/eslint-plugin-unicorn
const unicornConfig = defineConfig([
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      "unicorn/no-null": "off",
    },
    name: "project/unicorn/disable",
  },
  {
    rules: {
      "unicorn/filename-case": "off",
    },
    name: "project/unicorn/disable",
    files: ["**/*.md"],
  },
]);

// Docs: https://www.npmjs.com/package/eslint-plugin-sonarjs?activeTab=versions
const sonarjsConfig = defineConfig([
  sonarjs.configs.recommended,
  {
    rules: {
      "sonarjs/prefer-read-only-props": "off",
      "sonarjs/no-nested-conditional": "off",
      "sonarjs/no-commented-code": "off",
      "sonarjs/todo-tag": "off",
    },
    name: "project/sonarjs/disable",
  },
]);

// Docs: https://www.npmjs.com/package/eslint-plugin-import?activeTab=readme
const importConfig = defineConfig([
  {
    rules: {
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
      "import/no-named-as-default-member": "warn",
      "import/newline-after-import": "error",
      "import/no-mutable-exports": "error",

      "import/no-named-as-default": "warn",
      "import/no-absolute-path": "error",
      "import/no-self-import": "error",

      "import/no-unresolved": "error",
      "import/no-duplicates": "error",

      "import/group-exports": "error",

      "import/exports-last": "error",
      "import/default": "error",
      "import/no-cycle": "warn",
      "import/export": "error",

      // Style guide
      "import/first": "error",
    },
    settings: {
      "import/resolver": {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true,
        node: true,
      },
    },
    plugins: {
      import: importPlugin,
    },
    name: "project/eslint-import-plugin",
  },
]);

// Docs: https://www.npmjs.com/package/eslint-config-prettier
const prettierConfig = defineConfig([prettier]);

// MDX configuration Docs: https://www.npmjs.com/package/eslint-plugin-mdx
const mdxConfig = defineConfig([
  {
    name: "project/mdx-files",
    files: ["**/*.mdx"],
    ...mdxPlugin.flat,
    processor: mdxPlugin.createRemarkProcessor({
      // Disable linting code blocks for better performance
      lintCodeBlocks: false,
      languageMapper: {},
    }),
  },
  {
    name: "project/mdx-code-blocks",
    files: ["**/*.mdx"],
    ...mdxPlugin.flatCodeBlocks,
    rules: {
      ...mdxPlugin.flatCodeBlocks.rules,
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    rules: {
      // MDX often has unescaped entities in text content
      "react/no-unescaped-entities": "off",
    },
    name: "project/mdx-react-overrides",
    files: ["**/*.mdx"],
  },
]);

// React Compiler configuration (experimental)
const reactCompilerConfig = defineConfig([
  {
    rules: {
      "react-compiler/react-compiler": "error",
    },
    plugins: {
      "react-compiler": reactCompilerPlugin,
    },
    name: "project/react-compiler",
    files: ["**/*.{jsx,tsx}"],
  },
]);

// Tailwind CSS configuration
const tailwindcssConfig = defineConfig({
  rules: {
    // all rules (recommended = stylistic + correctness)
    ...tailwindcssPlugin.configs.recommended.rules,
    // stylistic rules only
    //...tailwindcssPlugin.configs.stylistic.rules,
    // correctness rules only
    //...tailwindcssPlugin.configs.correctness.rules,
    // single customizations
    // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/README.md#rules
    // https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md
    "better-tailwindcss/enforce-consistent-line-wrapping": [
      "warn",
      {
        lineBreakStyle: "unix", // Line breaks: 'windows' (\r\n) | 'unix' (\n)
        preferSingleLine: true, // Keep variants on single line until limits exceeded
        classesPerLine: 0, // Maximum classes per line (0 = disabled)
        group: "newLine", // Group separation: 'emptyLine' | 'never' | 'newLine'
        printWidth: 80, // Maximum line length (0 = disabled)
        indent: 2, // Indentation: number of spaces or 'tab'
      },
    ],
  },
  settings: {
    "better-tailwindcss": {
      // tailwindcss (4) css based
      entryPoint: "src/styles/globals.css",
      // for tailwindcss (3) with a config
      //"tailwindConfig": "tailwind.config.js"
    },
  },
  plugins: {
    "better-tailwindcss": tailwindcssPlugin,
  },
  name: "custom/tailwindcss/recommended",
  files: ["**/*.ts?(x)"],
});

const eslintConfig = defineConfig([
  ...ignoresConfig,
  ...nodeGlobalsConfig,
  ...eslintJSConfig,
  ...typescriptConfig,
  ...reactConfig,
  ...prettierConfig,
  ...jsBoundariesConfig,
  ...reduxHooksLintConfig,
  ...jsonConfig,
  ...eslintCommentsConfig,
  ...testConfigs,
  ...perfectionistConfigs,
  ...securityConfig,
  ...unicornConfig,
  ...sonarjsConfig,
  ...importConfig,
  ...mdxConfig,
  ...reactCompilerConfig,
  ...tailwindcssConfig,
]);

export default eslintConfig;
