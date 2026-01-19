#!/bin/bash

# Script to apply branch protection rules to the main branch
# Requires: GitHub CLI (gh) to be installed and authenticated

set -e

# Dynamically get the repository name
REPO=$(gh repo view --json owner,name --jq '.owner.login + "/" + .name' 2>/dev/null || echo "MrMadHatt/dev-prompts")
BRANCH="main"

echo "🔒 Applying branch protection rules to $REPO:$BRANCH"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Please install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI."
    echo "Please run: gh auth login"
    exit 1
fi

echo "✓ GitHub CLI is installed and authenticated"
echo ""

# Apply branch protection using GitHub API
echo "Applying branch protection rules..."

gh api repos/$REPO/branches/$BRANCH/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["Lint","Build"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"dismissal_restrictions":{},"dismiss_stale_reviews":true,"require_code_owner_reviews":false,"required_approving_review_count":1,"require_last_push_approval":false,"bypass_pull_request_allowances":{}}' \
  --field restrictions=null \
  --field allow_force_pushes='{"enabled":false}' \
  --field allow_deletions='{"enabled":false}' \
  --field required_conversation_resolution='{"enabled":true}' \
  > /dev/null

echo ""
echo "✅ Branch protection rules applied successfully!"
echo ""
echo "The following protections are now active on the '$BRANCH' branch:"
echo "  ✓ Require pull request reviews (1 approval required)"
echo "  ✓ Dismiss stale reviews on new commits"
echo "  ✓ Require conversation resolution before merging"
echo "  ✓ Require status checks: Lint, Build"
echo "  ✓ Require branches to be up to date before merging"
echo "  ✓ Prevent force pushes"
echo "  ✓ Prevent branch deletion"
echo ""
echo "You can verify these settings at:"
echo "https://github.com/$REPO/settings/branches"
