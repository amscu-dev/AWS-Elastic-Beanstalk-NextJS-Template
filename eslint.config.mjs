import { configs as perfectionist } from "eslint-plugin-perfectionist";
import tailwindcssPlugin from "eslint-plugin-better-tailwindcss";
import reactCompilerPlugin from "eslint-plugin-react-compiler";
import nextVitals from "eslint-config-next/core-web-vitals";
import eslintComments from "eslint-plugin-eslint-comments";
import testingLibrary from "eslint-plugin-testing-library";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { configs as jsonc } from "eslint-plugin-jsonc";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import boundaries from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import";
import * as mdxPlugin from "eslint-plugin-mdx";
import security from "eslint-plugin-security";
import { defineConfig } from "eslint/config";
import sonarjs from "eslint-plugin-sonarjs";
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

const baseConfig = defineConfig([...nextVitals, ...nextTs]);

const jsBoundariesConfig = defineConfig([
  // Docs: https://www.jsboundaries.dev/
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
    files: ["**/*.{ts,tsx}"],
  },
  {
    rules: {
      "@typescript-eslint/no-restricted-imports": "off",
    },
    files: ["src/store/hooks.ts"],
  },
]);

// Docs: https://ota-meshi.github.io/eslint-plugin-jsonc
const jsonConfig = defineConfig([
  ...jsonc["recommended-with-json"],
  {
    files: [".vscode/**/*.json", ".devcontainer/**/*.json"],
    rules: {
      "jsonc/no-comments": "off",
    },
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
  perfectionist["recommended-line-length"],
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
  },
  {
    rules: {
      "unicorn/filename-case": "off",
    },
    files: ["**/*.md"],
  },
]);

// Docs: https://www.npmjs.com/package/eslint-plugin-sonarjs?activeTab=versions
const sonarjsConfig = defineConfig([
  sonarjs.configs.recommended,
  {
    rules: {
      "sonarjs/no-nested-conditional": "off",
      "sonarjs/no-commented-code": "off",
      "sonarjs/todo-tag": "off",
    },
  },
]);

// Docs: https://www.npmjs.com/package/eslint-plugin-import?activeTab=readme
const importConfig = defineConfig([
  {
    rules: {
      // Helpful warnings
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/__tests__/**",
            "**/*.test.*",
            "**/*.spec.*",
            "eslint.config.*",
            "next.config.*",
            "jest.config.*",
            "jest.setup.ts",
            "mocks/**/*",
            "playwright.config.ts",
          ],
        },
      ],
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
    plugins: {
      import: importPlugin,
    },
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
  ...baseConfig,
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
