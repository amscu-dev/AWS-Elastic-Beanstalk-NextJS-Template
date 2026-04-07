#!/bin/bash

# =============================================================================
# Script: customize-oidc-sub.sh
# Description: Customizes the OIDC subject claim template for a GitHub
#              repository to include repo, context, and job_workflow_ref.
#              This is required when you want to restrict AWS role access
#              to specific workflows, not just repositories/environments.
#
# Official Documentation:
#   https://docs.github.com/en/rest/actions/oidc?apiVersion=2022-11-28#set-the-customization-template-for-an-oidc-subject-claim-for-a-repository
#
# Required GitHub Personal Access Token (PAT):
#   - Type: Fine-grained personal access token
#   - Permissions required: "Actions" repository permission (Read and Write)
#   - Scope (classic token alternative): "repo"
# =============================================================================

# --- Validate input ---
if [ -z "$1" ]; then
  echo "Error: No token provided."
  echo "Usage: ./customize-oidc-sub.sh <YOUR_GITHUB_PAT>"
  exit 1
fi

TOKEN=$1

# --- Repository configuration ---
# Update these variables to match your repository
OWNER="amscu-dev"
REPO="AWS-Elastic-Beanstalk-NextJS-CI-CD"

# --- Send PUT request to GitHub API ---
# Sets use_default to false and includes repo, context, and job_workflow_ref
# in the OIDC sub claim so AWS trust policies can restrict access
# to specific workflows, not just repositories/environments.
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
  -L \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/$OWNER/$REPO/actions/oidc/customization/sub \
  -d '{"use_default":false,"include_claim_keys":["repo","context","job_workflow_ref"]}')

# --- Check response ---
if [ "$RESPONSE" -eq 201 ]; then
  echo "✅ OIDC sub claim customized successfully for $OWNER/$REPO"
  echo "   Included claims: repo, context, job_workflow_ref"
else
  echo "❌ Failed to customize OIDC sub claim. HTTP status: $RESPONSE"
  echo "   Check that your token has the correct permissions (Actions: Read and Write)"
  exit 1
fi
