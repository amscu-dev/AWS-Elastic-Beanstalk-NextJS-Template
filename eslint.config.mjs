import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import boundaries from "eslint-plugin-boundaries";
import eslintPluginJsonc from "eslint-plugin-jsonc";

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
    plugins: { boundaries },
    settings: {
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        {
          mode: "full",
          type: "shared",
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
        },
        {
          mode: "full",
          type: "feature",
          capture: ["featureName"],
          pattern: ["src/features/*/**/*"],
        },
        {
          mode: "full",
          type: "app",
          capture: ["_", "fileName"],
          pattern: ["src/app/**/*"],
        },
        {
          mode: "full",
          type: "neverImport",
          pattern: ["src/proxy.ts"],
        },
      ],
    },
    rules: {
      "boundaries/no-unknown": ["error"],
      "boundaries/no-unknown-files": ["error"],
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          message:
            "[{{from.type}}/{{from.captured.featureName}}] cannot import [{{to.type}}/{{to.captured.featureName}}]",
          rules: [
            {
              from: { type: "shared" },
              allow: { to: { type: "shared" } },
            },
            {
              from: { type: "feature" },
              disallow: {
                to: { type: "app" },
              },
              message:
                "[feature/{{from.captured.featureName}}] cannot import from [app]. Features must not depend on the app layer.",
            },
            {
              from: { type: "feature" },
              disallow: {
                to: {
                  type: "feature",
                  captured: {
                    featureName: "!{{from.captured.featureName}}",
                  },
                },
              },
              message:
                "[feature/{{from.captured.featureName}}] cannot import from [feature/{{to.captured.featureName}}]. A feature may import only from itself or from shared.",
            },
            {
              from: { type: "feature" },
              allow: {
                to: [
                  { type: "shared" },
                  {
                    type: "feature",
                    captured: {
                      featureName: "{{ from.captured.featureName }}",
                    },
                  },
                ],
              },
            },
            {
              from: { type: "app" },
              allow: {
                to: [
                  { type: "shared" },
                  { type: "feature" },
                  { type: "app", captured: { fileName: "*.css" } },
                ],
              },
            },
            {
              from: { type: "neverImport" },
              allow: {
                to: [{ type: "shared" }, { type: "feature" }],
              },
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": "off",
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-redux",
              importNames: ["useSelector", "useDispatch"],
              message:
                "Use typed hooks `useAppDispatch` and `useAppSelector` instead.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/store/hooks.ts"],
    rules: {
      "@typescript-eslint/no-restricted-imports": "off",
    },
  },
  ...eslintPluginJsonc.configs["recommended-with-json"],
  {
    files: [".vscode/**/*.json", ".devcontainer/**/*.json"],
    rules: {
      "jsonc/no-comments": "off",
    },
  },
]);

export default eslintConfig;
