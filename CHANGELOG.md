# aws_elastic_beanstalk_nextjs_cicd

## 0.0.4

### Patch Changes

- ae88dd3: test release workflow

## 0.0.3

### Patch Changes

- 899846e: Added two GitHub Actions workflows to automate the creation and teardown of ephemeral AWS Elastic Beanstalk environments for pull requests, triggered by /deploy and /destroy comments or automatically on PR close.

## 0.0.2

### Patch Changes

- ac3e5a0: Added a PR Lifecycle Comments workflow that automatically posts a comment on every newly opened pull request, instructing contributors to use /deploy to spin up a staging environment and /destroy to tear it down.
