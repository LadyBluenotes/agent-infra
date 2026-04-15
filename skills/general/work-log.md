---
name: skills/general/work-log
description: Create or update requested cumulative work logs under @notes/work-log, with checkbox plans, plan notes, source links, tradeoffs, tests, and verification.
type: sub-skill
category: general
---

# Work Log

## Setup
Use this when the user asks to log, preserve, resume, or summarize task context.
Before substantial work, check for likely logs and ask whether to update or create one.

```text
Found @notes/work-log/<repo-id>/<task-slug>.md. Update it for this work?
```

If no likely log exists:

```text
Do you want a work-log for this task?
```

## Core Patterns

### Store cumulative task logs
Use one Markdown file per repo task in the private notes repo.

```text
@notes/work-log/<repo-id>/<task-slug>.md
```

Append to the existing file. Do not create per-chat files unless the task is chat-scoped.

### Match existing logs first
Before asking, search `@notes/work-log/<repo-id>/` for likely matches.

Match by:
- task slug words
- prompt keywords
- branch name
- mentioned issue, PR, or feature name

If multiple logs match, ask which one to update.

### Keep plan and notes related
Use `## Plan` for commitable or reviewable chunks. Use stable IDs so notes keep matching after titles change.

```md
## Plan

- [ ] P1 - Define public config shape
- [ ] P2 - Add parser and validation tests
- [ ] P3 - Implement normalization
```

Record details under `## Plan Notes` with matching IDs.

```md
### P2 - Add parser and validation tests

- Status: planned
- Request:
- Work:
- Rationale:
- Tradeoffs:
- Sources:
- Tests:
- Verification:
- Follow-ups:
```

### Track plan changes
When chunks are added, removed, renamed, split, or merged, record why.

```md
## Plan Changes

### 2026-04-15
- Added P2 because parser behavior needs direct coverage.
- Removed P5 because docs generator changes are out of scope.
```

### Link sources for later review
Use blog-style Markdown links. Prefer public repo links when available.

```md
- Source: [implementation file](https://github.com/<owner>/<repo>/blob/main/src/file.ts)
- Source: [test file](https://github.com/<owner>/<repo>/blob/main/tests/file.test.ts)
```

If no public URL is known, use repo-relative text.

```md
- Source: `<repo-id>/src/file.ts`
```

Avoid machine-local absolute paths in log content.

### Keep entries short and useful
Summarize what was done and why. Do not paste transcripts or long command output.
Include commands by name, exit status, and important result.

## References

- @notes/work-log/README.md

## Common Mistakes

### Logging without request
Wrong
```text
"Created a work-log after every task automatically."
```
Correct
```text
"Asked before substantial work, then logged only after the user said yes."
```
Explanation: Work logs are user-controlled context, not automatic noise.

### Splitting one task across chats
Wrong
```text
@notes/work-log/<repo-id>/chat-1.md
@notes/work-log/<repo-id>/chat-2.md
```
Correct
```text
@notes/work-log/<repo-id>/<task-slug>.md
```
Explanation: The file is cumulative by task, so context survives chat boundaries.

### Using local system links
Wrong
```md
- Source: [implementation file](/home/user/GitHub/repo/src/file.ts)
```
Correct
```md
- Source: [implementation file](https://github.com/<owner>/<repo>/blob/main/src/file.ts)
```
Explanation: Work logs should be portable and reviewable outside one machine.

### Separating plan from evidence
Wrong
```md
## Work Log
- Did parser tests.
```
Correct
```md
## Plan
- [x] P2 - Add parser and validation tests

## Plan Notes
### P2 - Add parser and validation tests
- Tests: Added invalid config coverage.
- Verification: `pnpm test` exit 0.
```
Explanation: Plan items and notes should map to the same reviewable chunk.
