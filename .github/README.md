# Branch Protection Configuration

This directory contains the branch protection rules configuration for the repository.

## Overview

Branch protection rules help maintain code quality and prevent accidental or malicious changes to important branches.

## Configuration Files

### `.github/branch-protection-rules.yml`

This file defines the branch protection ruleset for the `main` branch. While GitHub doesn't automatically apply ruleset YAML files, this serves as documentation and can be used with GitHub's API or CLI to configure branch protections.

### `.github/workflows/ci.yml`

This workflow runs automated checks on pull requests and pushes to the main branch:
- **Lint**: Runs ESLint to check code quality
- **Build**: Ensures the project builds successfully

## Branch Protection Rules

The following protections are configured for the `main` branch:

### 1. Require Pull Request Reviews
- **Required approving reviews**: 1
- **Dismiss stale reviews**: Yes (reviews are dismissed when new commits are pushed)
- **Require review thread resolution**: Yes (all comments must be resolved)

### 2. Require Status Checks
The following status checks must pass before merging:
- Lint (ESLint)
- Build (Vite build)

**Strict status checks**: Yes (branches must be up to date before merging)

### 3. Additional Protections
- **Prevent force pushes**: Force pushes are not allowed
- **Prevent deletion**: The branch cannot be deleted
- **Bypass actors**: Repository administrators can bypass these rules

## How to Apply These Rules

### Option 1: GitHub Web UI

1. Go to your repository settings
2. Navigate to "Branches" under "Code and automation"
3. Click "Add branch protection rule" or "Add ruleset"
4. Configure the following:
   - Branch name pattern: `main`
   - Enable "Require a pull request before merging"
     - Required approvals: 1
     - Dismiss stale pull request approvals when new commits are pushed: ✓
     - Require conversation resolution before merging: ✓
   - Enable "Require status checks to pass before merging"
     - Require branches to be up to date before merging: ✓
     - Add status checks: `Lint`, `Build`
   - Enable "Do not allow bypassing the above settings"
   - Enable "Do not allow force pushes"
   - Enable "Do not allow deletions"
5. Click "Create" or "Save changes"

### Option 2: GitHub CLI

```bash
# First, ensure you have the GitHub CLI installed and authenticated
gh auth login

# Create branch protection rule using the GitHub API
gh api repos/MrMadHatt/dev-prompts/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["Lint","Build"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"dismissal_restrictions":{},"dismiss_stale_reviews":true,"require_code_owner_reviews":false,"required_approving_review_count":1,"require_last_push_approval":false}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

### Option 3: Using Repository Rulesets (Recommended)

GitHub's newer Rulesets feature provides more flexibility:

1. Go to repository Settings
2. Navigate to "Rules" → "Rulesets"
3. Click "New ruleset" → "New branch ruleset"
4. Configure:
   - Name: "Protect main branch"
   - Enforcement status: Active
   - Target branches: `main`
   - Rules:
     - Require a pull request before merging (1 approval)
     - Require status checks to pass
     - Block force pushes
     - Restrict deletions

## Testing the Protection

After applying the rules:

1. Try to push directly to main (should be blocked)
2. Create a pull request
3. Verify that status checks run
4. Attempt to merge without approval (should be blocked)
5. Get approval and ensure checks pass before merging

## Maintenance

Update the CI workflows in `.github/workflows/ci.yml` if you add new checks or change the build process. Ensure the status check names match those configured in the branch protection rules.

## References

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Rulesets Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [GitHub Actions Status Checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)
