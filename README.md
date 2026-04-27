![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Famscu-dev%2FAWS-Elastic-Beanstalk-NextJS-CI-CD%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.version&prefix=v.&style=flat&label=Version) ![Dependabot](https://img.shields.io/badge/dependabot-active-brightgreen?style=plastic&logo=dependabot) ![GitLeaks](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/gitleaks.yaml?style=plastic&logo=keeweb&logoColor=white&label=GitLeaks&labelColor=%233f07f7) ![CodeQL](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/codeql-analysis.yaml?style=plastic&logo=github&logoColor=white&label=CodeQL&labelColor=%233f07f7) ![GitGuardian](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/gitguardian.yaml?style=plastic&logo=keeweb&logoColor=white&label=GitGuardian&labelColor=%233f07f7) ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/snyk.yaml?style=plastic&logo=snyk&label=Snyk%20Security%20Scan%20CI&labelColor=%233f07f7)
![CI](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/ci.yaml?style=plastic&logo=github&logoColor=white&label=CI&labelColor=%23f78307) ![SuperLinter](https://img.shields.io/github/actions/workflow/status/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/linter.yaml?style=plastic&logo=github&logoColor=white&label=SuperLinter&labelColor=%23f78307) [![codecov](https://codecov.io/gh/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD/graph/badge.svg?token=O463019QGC)](https://codecov.io/gh/amscu-dev/AWS-Elastic-Beanstalk-NextJS-CI-CD)

# AWS Elastic Beanstalk — Next.js CI/CD Template

A production-grade Next.js template engineered with scalable architecture, hardened security
pipelines, and deployment-ready GitHub Actions workflows. It consolidates an opinionated CI/CD
pipeline, multi-layer secret scanning, keyless AWS authentication via OIDC, and a feature-based
architecture into a single, ready-to-fork foundation.

---

## Table of Contents

- [Features](#features)
  - [Security](#-security)
  - [OIDC](#-oidc)
  - [CI/CD](#-cicd)
  - [Code Quality](#-code-quality)
  - [Architecture](#️-architecture)
  - [Data Fetching](#-data-fetching)
  - [State Management](#️-state-management)
  - [Observability](#-observability)
  - [Testing](#-testing)
  - [Developer Experience](#️-developer-experience)
- [Tools & Packages](#-tools--packages)
- [Configuration](#configuration)
  - [Application](#application)
  - [Source-level Configuration](#source-level-configuration)
  - [GitHub Actions](#github-actions)
  - [Required Secrets & Variables](#required-secrets--variables)

## Features

### 🔐 Security

#### 🫸Pre-commit & Pre-push Hooks

**[SECURITY]** — Pre-commit secret scanning via `gitleaks`, executed locally in an isolated Docker
container as a Git `pre-commit` hook, preventing credential leakage before code reaches the remote.

**[SECURITY]** — Pre-push secret scanning via `ggshield` (GitGuardian Shield), enforced as a Git
`pre-push` hook in a Docker container, adding a second layer of exfiltration prevention at push time.

**[SECURITY]**— Static analysis of GitHub Actions workflow files via `zizmor`, executed locally in
Docker as a `pre-commit` hook, surfacing misconfigurations and supply-chain vulnerabilities before
CI execution.

**[SECURITY]** — GitHub Actions workflow linting via `actionlint`, containerized and enforced as a
`pre-commit` hook, ensuring syntactic and semantic correctness of all workflow definitions.

#### ⛓️ Supply Chain & Dependency Scanning

**[SECURITY]** — Continuous vulnerability scanning, secret detection, and semantic code analysis across the full SDLC via dedicated workflows with **Snyk**, **GitGuardian**, and **CodeQL**.

**[SECURITY]** — Automated dependency version PRs via **Dependabot**, with a curated policy controlling vulnerability severity thresholds.

#### 🪪 Runtime Hardening

**[SECURITY]** — Hardened, environment-aware HTTP security headers in `next.config.ts`, covering CSP, HSTS, and X-Frame-Options for both contexts.

---

### 🔑 OIDC

**[OIDC]** — Custom shell script to programmatically configure the OIDC subject claim template
for a GitHub repository, scoping trust to `repo`, `context`, and `job_workflow_ref` — a prerequisite
for restricting AWS IAM role assumption to specific reusable workflows rather than entire repositories
or environments.

**[OIDC]** — Reference AWS IAM trust policy provided under `.github/docs/policies/`, demonstrating
a production-grade OIDC federation configuration for keyless, credential-free AWS access from
GitHub Actions.

---

### 🚀 CI/CD

#### Deployment Workflows

**[CI/CD]** — Automated deployment to AWS Elastic Beanstalk across `staging` and `production`, fully parameterized via repository variables.

**[CI/CD]** — On GitHub Release, deploys to staging, runs tests, then promotes automatically to production without manual intervention.

**[CI/CD]** — Commenting `/deploy` on a PR spins up an isolated Elastic Beanstalk environment for branch-level validation.

**[CI/CD]** — Parallel **Vercel** deployment workflow covering both `staging` and `production`, driven by repository secrets and variables.

#### Notifications

**[CI/CD]** — Real-time deployment status notifications delivered to Slack channels, including live environment URLs per deployment event.

---

### 🧹 Code Quality

#### Linting & Static Analysis

**[CODE QUALITY]** — **SuperLinter** GitHub workflow providing a unified, multi-language linting
surface with per-linter configuration files co-located under `.github/linters/`.

**[CODE QUALITY]** — Fully modular **ESLint** configuration (`eslint.config.mjs`) architected for
composability — plugins can be adopted or ejected independently without cascading configuration
side-effects.

**[CODE QUALITY]** — **ESLint Import Boundaries** enforcement via `eslint-plugin-boundaries`,
codifying the feature-based module graph and preventing cross-feature coupling at the static
analysis level.

---

### 🏗️ Architecture

#### 📂 Project Structure

**[ARCHITECTURE]** — Feature-based vertical slice structure under `/src/features/*`, co-locating components, hooks, services, and types per domain.

**[ARCHITECTURE]** — Layered API architecture per feature: a dedicated `*.api.ts` module
encapsulates raw HTTP calls (via Axios), consumed exclusively through `*.hooks.ts` React Query
custom hooks — enforcing separation between transport and cache management layers.

**[ARCHITECTURE]** — Global retry strategy for React Query, configured centrally in
`/src/config/react-query.config.ts`, ensuring consistent resilience semantics across all
asynchronous data fetching operations.

---

### ⚡ Data Fetching

#### Server/Client Data Fetching

**[DATA FETCHING]** — Server-side React Query prefetching with `HydrationBoundary`, serializing the query cache to eliminate redundant client-side fetches.

**[DATA FETCHING]** — Three HOCs that intercept and resolve hydration mismatches caused by `Suspense` boundaries during initial SSR render.

**[DATA FETCHING]** — Implementation of a memoized React Query selector functions, preventing expensive recomputation on unrelated component re-renders.

---

### 🗃️ State Management

**[STATE MGMT]** — Custom `useProxySelector` hook — a memoized Redux `useSelector` wrapper
leveraging `proxy-memoize`, which uses ES Proxy traps to track accessed state paths and avoid
triggering unnecessary re-renders when unrelated state slices mutate.

---

### 📡 Observability

#### 🚨 Error Tracking & Monitoring

**[OBSERVABILITY]** — Full **Sentry** integration with source map upload, enabling symbolicated stack traces and performance monitoring in production.

**[OBSERVABILITY]** — **Sentry Spotlight** surfaces real-time Sentry events locally in the browser, without requiring a remote project connection.

---

### 🧪 Testing

**[TESTING]** — Reusable `createServer()` MSW factory enabling per-test-file handler overrides for complete, stateless API-level test isolation.

**[TESTING]** — **Codecov** configuration with component-level coverage segmentation, enabling differential coverage analysis per feature boundary across builds.

---

### 🛠️ Developer Experience

**[DX]** — `.devcontainer/` provides an OS-agnostic, fully tooled development environment eliminating local setup inconsistencies across team machines.

**[DX]** — **VS Code launch configurations** (`.vscode/launch.json`) for both client-side and
server-side debugging, enabling breakpoint-driven inspection of Next.js App Router code paths
without additional setup.

## 🧰 Tools & Packages

<img src="https://cdn.simpleicons.org/jest/C21325" height="20" alt="Jest" /> **[Jest](https://jestjs.io/)** — Unit testing framework with built-in coverage and mocking.

<img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright" width="20" /> **[Playwright](https://playwright.dev/)** — Cross-browser end-to-end testing with network interception support.

<img src="https://github.com/mswjs.png?size=40" height="20" alt="MSW" /> **[MSW](https://mswjs.io/)** — Intercepts network requests for seamless API mocking in tests.

<img src="https://github.com/Flagsmith.png?size=40" height="20" alt="Flagsmith" /> **[Flagsmith](https://flagsmith.com/)** — Feature flag platform for controlled rollouts without redeployment.

---

<img src="https://cdn.simpleicons.org/eslint/4B32C3" height="20" alt="ESLint" /> **[ESLint](https://eslint.org/)** — Static analysis tool enforcing code quality and consistency.

<img src="https://cdn.simpleicons.org/eslint/4B32C3" height="20" alt="ESLint" /> **[eslint-plugin-boundaries](https://github.com/javierbrea/eslint-plugin-boundaries)** — Enforces strict architectural boundaries between feature-based modules.

<img src="https://cdn.simpleicons.org/prettier/F7B93E" height="20" alt="Prettier" /> **[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)** — Disables ESLint rules that conflict with Prettier formatting.

<img src="https://cloud.githubusercontent.com/assets/170270/18659176/1cc373d0-7f33-11e6-890f-0ba35362ee7e.jpg" height="20" alt="sindresorhus" /> **[eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)** — Opinionated rules promoting modern JavaScript best practices.

<img src="https://cdn.simpleicons.org/eslint/4B32C3" height="20" alt="ESLint" /> **[eslint-plugin-security](https://github.com/eslint-community/eslint-plugin-security)** — Detects potential security vulnerabilities and unsafe code patterns.

<img src="https://assets-eu-01.kc-usercontent.com/ef593040-b591-0198-9506-ed88b30bc023/8e59bcad-6e39-41dc-abd9-a0e251e8d63f/Sonar%20%282%29.svg?w=128&h=32&dpr=2&fit=crop&q=80" height="20" alt="SonarQube" /> **[eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)** — Ports SonarQube code smell and complexity rules into ESLint.

<img src="https://cdn.simpleicons.org/eslint/4B32C3" height="20" alt="ESLint" /> **[eslint-plugin-import](https://github.com/import-js/eslint-plugin-import)** — Validates imports, prevents circular dependencies, enforces ordering.

<img src="https://raw.githubusercontent.com/azat-io/eslint-plugin-perfectionist/main/docs/public/logo.svg" height="20" alt="Perfectionist" /> **[eslint-plugin-perfectionist](https://perfectionist.dev/)** — Enforces deterministic sorting of imports, exports, and props.

<img src="https://cdn.simpleicons.org/eslint/4B32C3" height="20" alt="ESLint" /> **[eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)** — Detects and auto-removes unused import declarations.

<img src="https://cdn.simpleicons.org/eslint/4B32C3" height="20" alt="ESLint" /> **[eslint-plugin-eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments)** — Lints and restricts blanket ESLint disable directive comments.

<img src="https://raw.githubusercontent.com/testing-library/dom-testing-library/master/other/octopus.png" height="20" alt="ESLint" /> **[eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)** — Enforces Testing Library best practices in test files.

<img src="https://cdn.simpleicons.org/eslint/4B32C3" height="20" alt="ESLint" /> **[@eslint/js](https://github.com/eslint/eslint)** — Core ESLint recommended rules for JavaScript.

<img src="https://cdn.simpleicons.org/react/61DAFB" height="20" alt="ESLint" /> **[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)** — React-specific linting rules for JSX and component patterns.

<img src="https://cdn.simpleicons.org/react/61DAFB" height="20" alt="ESLint" /> **[eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)** — Enforces Rules of Hooks and exhaustive dependency arrays.

<img src="https://cdn.simpleicons.org/react/61DAFB" height="20" alt="ESLint" /> **[eslint-plugin-react-compiler](https://github.com/facebook/react/tree/main/compiler)** — Validates code compatibility with the React Compiler (experimental).

<img src="https://github.com/jsx-eslint.png?size=40" height="20" alt="ESLint" /> **[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)** — Enforces accessibility best practices on JSX elements.

<img src="https://cdn.simpleicons.org/nextdotjs/000000/ffffff" height="20" alt="ESLint" /> **[@next/eslint-plugin-next](https://nextjs.org/docs/app/api-reference/config/eslint)** — Next.js-specific rules for performance and correctness.

<img src="https://raw.githubusercontent.com/schoero/eslint-plugin-better-tailwindcss/HEAD/assets/eslint-plugin-better-tailwindcss-logo.svg" height="20" alt="ESLint" /> **[eslint-plugin-better-tailwindcss](https://github.com/schoero/eslint-plugin-better-tailwindcss)** — Enforces consistent Tailwind CSS class ordering and formatting.

<img src="https://ota-meshi.github.io/eslint-plugin-jsonc/logo.svg" height="20" alt="ESLint" /> **[eslint-plugin-jsonc](https://ota-meshi.github.io/eslint-plugin-jsonc/)** — Extended JSON/JSONC/JSON5 linting with comment support.

<img src="https://avatars.githubusercontent.com/u/37453691" height="20" alt="ESLint" /> **[eslint-plugin-mdx](https://github.com/mdx-js/eslint-mdx)** — Lints MDX files and embedded code blocks.

<img src="https://typescript-eslint.io/img/logo.svg" height="20" alt="ESLint" /> **[typescript-eslint](https://typescript-eslint.io/)** — TypeScript parser and type-aware rules for ESLint.

<img src="https://typescript-eslint.io/img/logo.svg" height="20" alt="ESLint" /> **[eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript)** — Resolves TypeScript path aliases for eslint-plugin-import.

<img src="https://eslint.style/logo.svg" height="20" alt="ESLint" /> **[@stylistic/eslint-plugin](https://eslint.style/)** — Stylistic formatting rules extracted from ESLint and TypeScript ESLint.

---

🐶 **[Husky](https://typicode.github.io/husky/)** — Manages Git hooks to enforce quality gates pre-commit.

<img src="https://github.com/lint-staged.png?size=40" height="20" alt="lint-staged" /> **[lint-staged](https://github.com/lint-staged/lint-staged)** — Runs linters exclusively against Git-staged files.

<img src="https://github.com/commitizen-tools.png?size=40" height="20" alt="Commitizen" /> **[Commitizen](https://commitizen-tools.github.io/commitizen/)** — Interactive CLI for Conventional Commits-compliant message authoring.

<img src="https://github.com/conventional-changelog.png?size=40" height="20" alt="commitlint" /> **[commitlint](https://commitlint.js.org/)** — Enforces Conventional Commits specification on every commit message.

---

<img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" height="20" alt="Tailwind CSS" /> **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework with built-in design system constraints.

<img src="https://cdn.simpleicons.org/prettier/F7B93E" height="20" alt="Prettier" /> **[Prettier](https://prettier.io/)** — Opinionated formatter ensuring consistent code style automatically.

<img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" height="20" alt="Tailwind CSS" /> **[prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)** — Auto-sorts Tailwind utility classes per recommended order.

---

<img src="https://github.com/kentcdodds.png?size=40" height="20" alt="cross-env" /> **[cross-env](https://github.com/kentcdodds/cross-env)** — Sets environment variables inline across all operating systems.

<img src="https://github.com/t3-oss.png?size=40" height="20" alt="T3 OSS" /> **[@t3-oss/env-nextjs](https://env.t3.gg/)** — Type-safe environment variable validation using Zod at build time.

---

<img src="https://cdn.simpleicons.org/zod/3E67B1" height="20" alt="Zod" /> **[Zod](https://zod.dev/)** — TypeScript-first schema validation for runtime type safety.

<img src="https://cdn.simpleicons.org/redux/764ABC" height="20" alt="Redux" /> **[React Redux](https://react-redux.js.org/)** — Predictable centralized global state management for React.

<img src="https://cdn.simpleicons.org/reactquery/FF4154" height="20" alt="TanStack Query" /> **[@tanstack/react-query](https://tanstack.com/query)** — Server state management with caching and background refetching.

<img src="https://github.com/47ng.png?size=40" height="20" alt="nuqs" /> **[nuqs](https://nuqs.47ng.com/)** — Type-safe URL search parameter state manager for Next.js.

<img src="https://cdn.simpleicons.org/axios/5A29E4" height="20" alt="Axios" /> **[Axios](https://axios-http.com/)** — Promise-based HTTP client with interceptors and error handling.

---

<img src="https://cdn.simpleicons.org/sentry/362D59" height="20" alt="Sentry" /> **[Sentry](https://sentry.io/)** — Real-time error tracking and application performance monitoring.

<img src="https://cdn.simpleicons.org/sentry/362D59" height="20" alt="Sentry Spotlight" /> **[Sentry Spotlight](https://spotlightjs.com/)** — Local Sentry overlay surfacing errors during development.

---

<img src="https://gitleaks.io/logo.png" height="20" alt="Gitleaks" /> **[Gitleaks](https://gitleaks.io/)** — Scans repositories for hardcoded secrets and credentials.

<img src="https://cdn.prod.website-files.com/5ee25cbe47310017adf964da/677d9ae6403cbf7d8cdb536d_logotype-horizontal-black.svg" height="20" alt="GitGuardian" /> **[ggshield](https://docs.gitguardian.com/ggshield-docs/readme)** — Real-time secret detection integrated into CI and Git hooks.

<img src="https://docs.zizmor.sh/assets/rainbow.svg" height="20" alt="GitHub" /> **[Zizmor](https://github.com/woodruffw/zizmor)** — Static analyzer for GitHub Actions security misconfigurations.

<img src="https://cdn.simpleicons.org/githubactions/2088FF" height="20" alt="GitHub Actions" /> **[ActionLint](https://github.com/rhysd/actionlint)** — Strict linter for GitHub Actions workflow file correctness.

<img src="https://github.com/github.png?size=40" height="20" alt="CodeQL" /> **[CodeQL](https://codeql.github.com/)** — Semantic code analysis engine for deep vulnerability scanning.

<img src="https://cdn.simpleicons.org/snyk/4C4A73" height="20" alt="Snyk" /> **[Snyk](https://snyk.io/)** — Scans dependencies and containers for known vulnerabilities.

---

<img src="https://github.com/super-linter.png?size=40" height="20" alt="Super-Linter" /> **[Super-Linter](https://github.com/super-linter/super-linter)** — Aggregates multiple linters into a single CI enforcement step.

<img src="https://github.com/dependabot.png?size=40" height="20" alt="Dependabot" /> **[Dependabot](https://docs.github.com/en/code-security/dependabot)** — Automates dependency updates and vulnerability patches via PRs.

<img src="https://cdn.simpleicons.org/codecov/F01F7A" height="20" alt="Codecov" /> **[Codecov](https://codecov.io/)** — Tracks coverage trends and annotates PRs with diff coverage.

<img src="https://github.com/changesets.png?size=40" height="20" alt="Changesets" /> **[@changesets/cli](https://github.com/changesets/changesets)** — Manages versioning and changelogs for structured release automation.

---

<img src="https://avatars.githubusercontent.com/u/102692984?s=200&v=4" height="20" alt="Dev Containers" /> **[Dev Containers](https://containers.dev/)** — Fully containerized, reproducible development environments for the entire team.

## Configuration

### Application

| File                | Purpose                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `next.config.ts`    | Next.js compiler options, environment variable exposure, image domains, security headers, and bundle analysis toggles |
| `tsconfig.json`     | TypeScript compiler configuration with strict mode, path aliases, and incremental build settings                      |
| `eslint.config.mjs` | Modular flat ESLint configuration; plugins are independently composable and removable                                 |

---

### Source-level Configuration

| Path                                | Purpose                                                                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `/src/config/react-query.config.ts` | Global React Query client configuration — default stale time, retry strategy, and error boundaries                   |
| `/src/config/axios/`                | Axios instance factory with interceptors for auth token injection, error normalization, and request/response logging |
| `/src/lib/flagsmith.ts`             | Flagsmith SDK instantiation for server and client-side feature flag evaluation                                       |
| `/src/store/store.ts`               | Redux Toolkit store configuration with middleware composition and dev tooling integration                            |
| `/src/providers/`                   | Global provider tree — wraps the application with React Query, Redux, Sentry, and feature flag context               |

---

### GitHub Actions

| Path                                    | Purpose                                                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `.github/dependabot.yaml`               | Dependabot scheduling configuration for automated dependency version PRs                                |
| `.github/dependency-review-config.yaml` | Dependency review action policy — defines allowed/denied licenses and vulnerability severity thresholds |
| `.github/linters/*`                     | Per-linter configuration files consumed by the SuperLinter workflow                                     |

---

### Required Secrets & Variables

The following secrets and variables must be provisioned in the repository settings before executing any CI/CD workflow.

#### Environment Secrets

| Secret                   | Environment             | Description                                                           |
| ------------------------ | ----------------------- | --------------------------------------------------------------------- |
| `FLAGSMITH_KEY`          | `staging`, `production` | Flagsmith environment SDK key for server-side feature flag evaluation |
| `NEXT_PUBLIC_SENTRY_DSN` | `production`            | Sentry Data Source Name for client-side error ingestion               |
| `SENTRY_AUTH_TOKEN`      | `production`            | Auth token for authenticated source map upload to Sentry              |
| `SENTRY_ORGANIZATION`    | `production`            | Sentry organization slug                                              |
| `SENTRY_PROJECT`         | `production`            | Sentry project slug                                                   |
| `GITGUARDIAN_API_KEY`    | `gitguardian`           | GitGuardian API key for secret scanning workflow                      |
| `SNYK_TOKEN`             | `snyk`                  | Snyk authentication token for vulnerability scanning                  |
| `SNYK_ORG`               | `snyk`                  | Snyk organization identifier                                          |

#### Repository Secrets

| Secret                  | Description                                                                    |
| ----------------------- | ------------------------------------------------------------------------------ |
| `AWS_ACCESS_KEY_ID`     | AWS IAM credentials for Elastic Beanstalk deployment (use OIDC where possible) |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret for Elastic Beanstalk deployment                                |
| `CODECOV_TOKEN`         | Codecov upload token for coverage report ingestion                             |
| `CHANGESETS_TOKEN`      | GitHub token for automated changeset versioning and release PRs                |
| `FLAGSMITH_KEY`         | Fallback Flagsmith key for non-environment-scoped workflows                    |
| `SLACK_WEBHOOK_URL`     | Incoming webhook URL for deployment status Slack notifications                 |
| `VERCEL_TOKEN`          | Vercel authentication token                                                    |
| `VERCEL_ORG_ID`         | Vercel organization identifier                                                 |
| `VERCEL_PROJECT_ID`     | Vercel project identifier                                                      |
| `VERCEL_PROJECT_NAME`   | Vercel project display name                                                    |

#### Repository Variables

| Variable                   | Value                                           | Description                                         |
| -------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| `AWS_REGION`               | `eu-central-1`                                  | AWS region for all Elastic Beanstalk resources      |
| `AWS_EB_APP_NAME`          | `nextjs-app-cicd`                               | Elastic Beanstalk application name                  |
| `AWS_EB_PLATFORM`          | `Node.js 24 running on 64bit Amazon Linux 2023` | EB platform branch                                  |
| `AWS_EB_ENV_INSTANCE_TYPE` | `t3.large`                                      | EC2 instance type for EB environments               |
| `AWS_EB_STAGING_ENV`       | `app-staging`                                   | EB environment name for staging                     |
| `AWS_EB_PRODUCTION_ENV`    | `app-production`                                | EB environment name for production                  |
| `NEXT_PUBLIC_APP_URL`      | `http://localhost:3000`                         | Base application URL (override per environment)     |
| `VERCEL_PROJECT_NAME`      | `aws-elastic-beanstalk`                         | Vercel project alias used in workflow notifications |

> **Security note:** `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are provided as a compatibility fallback. For production-grade deployments, it is strongly recommended to replace static credentials with **OIDC-based keyless authentication** using the custom subject claim configuration provided in `.github/docs/policies/`.
