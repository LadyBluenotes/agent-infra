---
name: skills/review/pr-closeout
description: >
  PR closeout workflow for final diff review, CI state, unresolved feedback,
  issue links, draft readiness, merge readiness, and concise handoff notes.
type: sub-skill
category: review
depth: primary
aliases:
  - pr closeout
  - pull request closeout
tags:
  - github
  - pull request
  - ci
  - review
references:
  - skills/review/checklist
  - skills/review/output
  - skills/general/verification-before-completion
sources:
  - https://docs.github.com/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request
  - https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue
  - https://cli.github.com/manual/gh_pr_view
  - https://cli.github.com/manual/gh_pr_checks
  - https://cli.github.com/manual/gh_pr_ready
  - https://cli.github.com/manual/gh_pr_merge
---

# PR Closeout

## Setup

Use this before marking a PR ready, handing it off for review, or merging after fixes.

## Core Patterns

### Read PR state from GitHub

```sh
gh pr view --json number,title,isDraft,reviewDecision,mergeable,mergeStateStatus,statusCheckRollup,closingIssuesReferences,url
```

Use GitHub state for PR facts. Do not infer review or merge readiness from local branch state.

### Check CI directly

```sh
gh pr checks --required
gh pr checks --json name,state,bucket,link,workflow
```

`gh pr checks` reports CI state for one PR. Treat pending, skipped, cancelled, and failed checks as distinct states.

### Review the final diff

```sh
git diff --stat
git diff --check -- <touched-files>
```

For dependency changes, inspect both the rich dependency view when available and the source diff, because generated views may not cover every manifest or lockfile detail.

### Close the right loop

```text
Closeout note:
- Changed:
- Verified:
- Known risks:
- Review focus:
- Linked issue:
```

Only use closing keywords when the linked issue should close after merge.

### Mark ready only after evidence

```sh
gh pr ready
```

Use `gh pr ready` after requested fixes, relevant verification, and closeout notes are done. Do not use readiness as a substitute for checks.

## Common Mistakes

### HIGH Treating review requests as branch protection

```text
Wrong: "Request changes always blocks merge."
Correct: "Merge blocking depends on repository rules or branch protection."
```

GitHub documents requested changes as informational unless repository rules make reviews required.

### HIGH Merging without rechecking head state

```sh
gh pr view --json headRefOid,statusCheckRollup,mergeStateStatus
```

Confirm the current head commit and checks before merge-sensitive actions.

### MEDIUM Linking issues too broadly

```text
Wrong: add "Fixes #123" for a related issue that should remain open.
Correct: use a non-closing reference or omit the issue link.
```

Closing keywords have merge-time effects for linked issues.
