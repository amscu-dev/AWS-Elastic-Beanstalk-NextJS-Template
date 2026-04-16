import { type UserConfig } from "@commitlint/types";

const config = {
  prompt: {
    settings: {
      enableMultipleScopes: true,
    },
  },
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0],
  },
} satisfies UserConfig;

export default config;
