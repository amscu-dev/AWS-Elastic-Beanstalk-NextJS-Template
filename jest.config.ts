import type { Config } from "jest";

import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/e2e/"],
  testEnvironment: "jest-fixed-jsdom",

  coverageProvider: "v8",
};

// createJestConfig is exported th is way to ensure that next/jest can load the Next.js config which is async
// export default createJestConfig(config);

const getJestConfig = createJestConfig(config);
const fixedESMJestConfig = async () => {
  const config = await getJestConfig();

  return {
    ...config,
    transformIgnorePatterns: [
      "/node_modules/(?!(msw|@mswjs|@open-draft|until-async|rettime)/)",
    ],
  };
};
export default fixedESMJestConfig;
