#!/bin/bash
set -euo pipefail

echo "🔧 [DEBUG] ggshield.sh started"
echo "🔧 [DEBUG] Received arguments: $@"
echo "🔧 [DEBUG] Working directory: $(pwd)"

# Load GITGUARDIAN_API_KEY from .env
if [ -f .env ]; then
  echo "🔧 [DEBUG] .env file found, loading variables..."
  export GITGUARDIAN_API_KEY=$(awk -F= '$1=="GITGUARDIAN_API_KEY" {print substr($0, index($0,"=")+1)}' .env)
else
  echo "🔧 [DEBUG] .env file NOT found in $(pwd)"
fi

if [ -z "${GITGUARDIAN_API_KEY:-}" ]; then
  echo "❌ GITGUARDIAN_API_KEY is missing from .env"
  exit 1
fi

echo "🔧 [DEBUG] API Key loaded: ${GITGUARDIAN_API_KEY:0:6}***" # first 6 chars only
echo "🔧 [DEBUG] Docker image: gitguardian/ggshield"
echo "🔧 [DEBUG] STDIN received:"

cat - | tee /dev/stderr | docker run --rm -i \
  -e GITGUARDIAN_API_KEY \
  -v "$(pwd):/data" \
  -w /data \
  gitguardian/ggshield \
  ggshield secret scan pre-push \
  --verbose \
  "$@"

echo "✅ [DEBUG] ggshield scan completed successfully"
