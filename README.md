![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Famscu-dev%2FAWS-Elastic-Beanstalk-NextJS-CI-CD%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.version&prefix=v.&style=flat&label=Version) ![Dependabot](https://img.shields.io/badge/dependabot-active-brightgreen?style=plastic&logo=dependabot) ![GitLeaks](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/gitleaks.yaml?style=plastic&logo=keeweb&logoColor=white&label=GitLeaks&labelColor=%233f07f7) ![CodeQL](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/codeql-analysis.yaml?style=plastic&logo=github&logoColor=white&label=CodeQL&labelColor=%233f07f7) ![GitGuardian](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/gitguardian.yaml?style=plastic&logo=keeweb&logoColor=white&label=GitGuardian&labelColor=%233f07f7) ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/snyk.yaml?style=plastic&logo=snyk&label=Snyk%20Security%20Scan%20CI&labelColor=%233f07f7)
![CI](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/ci.yaml?style=plastic&logo=github&logoColor=white&label=CI&labelColor=%23f78307) ![SuperLinter](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/linter.yaml?style=plastic&logo=github&logoColor=white&label=SuperLinter&labelColor=%23f78307) [![codecov](https://codecov.io/gh/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/graph/badge.svg?token=O463019QGC)](https://codecov.io/gh/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD)

## 🧰 Tools & Packages

🧪 **[Jest](https://jestjs.io/)** — Unit testing framework with built-in coverage and mocking.

🎭 **[Playwright](https://playwright.dev/)** — Cross-browser end-to-end testing with network interception support.

🔌 **[MSW](https://mswjs.io/)** — Intercepts network requests for seamless API mocking in tests.

🚩 **[Flagsmith](https://flagsmith.com/)** — Feature flag platform for controlled rollouts without redeployment.

---

🔍 **[ESLint](https://eslint.org/)** — Static analysis tool enforcing code quality and consistency.

🏗️ **[eslint-plugin-boundaries](https://github.com/javierbrea/eslint-plugin-boundaries)** — Enforces strict architectural boundaries between feature-based modules.

🤝 **[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)** — Disables ESLint rules that conflict with Prettier formatting.

🦄 **[eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)** — Opinionated rules promoting modern JavaScript best practices.

🔒 **[eslint-plugin-security](https://github.com/eslint-community/eslint-plugin-security)** — Detects potential security vulnerabilities and unsafe code patterns.

🧬 **[eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)** — Ports SonarQube code smell and complexity rules into ESLint.

📦 **[eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)** — Validates imports, prevents circular dependencies, enforces ordering.

✨ **[eslint-plugin-perfectionist](https://perfectionist.dev/)** — Enforces deterministic sorting of imports, exports, and props.

🗑️ **[eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)** — Detects and auto-removes unused import declarations.

💬 **[eslint-plugin-eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments)** — Lints and restricts blanket ESLint disable directive comments.

🧫 **[eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)** — Enforces Testing Library best practices in test files.

🔷 **[@eslint/js](https://github.com/eslint/eslint)** — Core ESLint recommended rules for JavaScript.

⚛️ **[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)** — React-specific linting rules for JSX and component patterns.

🪝 **[eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)** — Enforces Rules of Hooks and exhaustive dependency arrays.

⚡ **[eslint-plugin-react-compiler](https://github.com/facebook/react/tree/main/compiler)** — Validates code compatibility with the React Compiler (experimental).

♿ **[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)** — Enforces accessibility best practices on JSX elements.

🔺 **[@next/eslint-plugin-next](https://nextjs.org/docs/app/api-reference/config/eslint)** — Next.js-specific rules for performance and correctness.

🎨 **[eslint-plugin-better-tailwindcss](https://github.com/schoero/eslint-plugin-better-tailwindcss)** — Enforces consistent Tailwind CSS class ordering and formatting.

📝 **[eslint-plugin-jsonc](https://ota-meshi.github.io/eslint-plugin-jsonc/)** — Extended JSON/JSONC/JSON5 linting with comment support.

📖 **[eslint-plugin-mdx](https://github.com/mdx-js/eslint-mdx)** — Lints MDX files and embedded code blocks.

🔷 **[typescript-eslint](https://typescript-eslint.io/)** — TypeScript parser and type-aware rules for ESLint.

🔗 **[eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript)** — Resolves TypeScript path aliases for eslint-plugin-import.

🖌️ **[@stylistic/eslint-plugin](https://eslint.style/)** — Stylistic formatting rules extracted from ESLint and TypeScript ESLint.

---

🐶 **[Husky](https://typicode.github.io/husky/)** — Manages Git hooks to enforce quality gates pre-commit.

🚦 **[lint-staged](https://github.com/lint-staged/lint-staged)** — Runs linters exclusively against Git-staged files.

📝 **[Commitizen](https://commitizen-tools.github.io/commitizen/)** — Interactive CLI for Conventional Commits-compliant message authoring.

📏 **[commitlint](https://commitlint.js.org/)** — Enforces Conventional Commits specification on every commit message.

---

🎨 **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework with built-in design system constraints.

💅 **[Prettier](https://prettier.io/)** — Opinionated formatter ensuring consistent code style automatically.

🌬️ **[prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)** — Auto-sorts Tailwind utility classes per recommended order.

---

🌍 **[cross-env](https://github.com/kentcdodds/cross-env)** — Sets environment variables inline across all operating systems.

🛡️ **[@t3-oss/env-nextjs](https://env.t3.gg/)** — Type-safe environment variable validation using Zod at build time.

---

⚡ **[Zod](https://zod.dev/)** — TypeScript-first schema validation for runtime type safety.

🗄️ **[React Redux](https://react-redux.js.org/)** — Predictable centralized global state management for React.

🔗 **[@tanstack/react-query](https://tanstack.com/query)** — Server state management with caching and background refetching.

🔎 **[nuqs](https://nuqs.47ng.com/)** — Type-safe URL search parameter state manager for Next.js.

🌐 **[Axios](https://axios-http.com/)** — Promise-based HTTP client with interceptors and error handling.

---

🚨 **[Sentry](https://sentry.io/)** — Real-time error tracking and application performance monitoring.

🔦 **[Sentry Spotlight](https://spotlightjs.com/)** — Local Sentry overlay surfacing errors during development.

---

🔐 **[Gitleaks](https://gitleaks.io/)** — Scans repositories for hardcoded secrets and credentials.

🛡️ **[ggshield](https://docs.gitguardian.com/ggshield-docs/readme)** — Real-time secret detection integrated into CI and Git hooks.

⚡ **[Zizmor](https://github.com/woodruffw/zizmor)** — Static analyzer for GitHub Actions security misconfigurations.

🔬 **[ActionLint](https://github.com/rhysd/actionlint)** — Strict linter for GitHub Actions workflow file correctness.

🧠 **[CodeQL](https://codeql.github.com/)** — Semantic code analysis engine for deep vulnerability scanning.

🐍 **[Snyk](https://snyk.io/)** — Scans dependencies and containers for known vulnerabilities.

---

✅ **[Super-Linter](https://github.com/super-linter/super-linter)** — Aggregates multiple linters into a single CI enforcement step.

🤖 **[Dependabot](https://docs.github.com/en/code-security/dependabot)** — Automates dependency updates and vulnerability patches via PRs.

📊 **[Codecov](https://codecov.io/)** — Tracks coverage trends and annotates PRs with diff coverage.

📦 **[@changesets/cli](https://github.com/changesets/changesets)** — Manages versioning and changelogs for structured release automation.

---

🐳 **[Dev Containers](https://containers.dev/)** — Fully containerized, reproducible development environments for the entire team.
