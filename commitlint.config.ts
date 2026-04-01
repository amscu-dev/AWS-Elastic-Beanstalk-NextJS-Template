import { type UserConfig } from "@commitlint/types";

const config = {
  extends: ["@commitlint/config-conventional"],
  prompt: {
    settings: {
      enableMultipleScopes: true,
    },
  },
  rules: {
    "subject-case": [0],
  },
} satisfies UserConfig;

export default config;
