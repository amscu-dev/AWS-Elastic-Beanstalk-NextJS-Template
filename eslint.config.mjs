import nextVitals from "eslint-config-next/core-web-vitals";
import { globalIgnores, defineConfig } from "eslint/config";
import eslintComments from "eslint-plugin-eslint-comments";
import testingLibrary from "eslint-plugin-testing-library";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import boundaries from "eslint-plugin-boundaries";
import security from "eslint-plugin-security";
// import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
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
  ...eslintPluginJsonc.configs["recommended-with-json"],
  {
    files: [".vscode/**/*.json", ".devcontainer/**/*.json"],
    rules: {
      "jsonc/no-comments": "off",
    },
  },
  {
    // Docs: https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/
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
  {
    files: ["**/__tests__/**/*.{jsx,tsx}"],
    ...testingLibrary.configs["flat/react"],
  },
  perfectionist.configs["recommended-line-length"],
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

export default eslintConfig;
