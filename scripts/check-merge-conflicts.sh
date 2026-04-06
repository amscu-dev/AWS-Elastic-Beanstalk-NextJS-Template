#!/usr/bin/env bash
set -euo pipefail

staged_files="$(git diff --cached --name-only --diff-filter=ACMR)"

if [ -z "$staged_files" ]; then
  exit 0
fi

if ! git diff --cached --check; then
  echo "Error: staged files contain merge conflict markers or whitespace problems."
  exit 1
fi