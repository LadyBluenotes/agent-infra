# Work Log

Use this directory for requested, cumulative task logs.

## Path

```text
notes/work-log/<repo-id>/<task-slug>.md
```

Examples:

```text
notes/work-log/<repo-id>/<feature-name>.md
notes/work-log/<repo-id>/<review-name>.md
notes/work-log/<repo-id>/<workflow-name>.md
```

## When To Create Or Update

- Ask before substantial work.
- Check `notes/work-log/<repo-id>/` for likely existing files first.
- If a likely file exists, ask whether to update it.
- If no likely file exists, ask whether to create one.
- Do not log tiny one-off answers unless requested.
- Do not log without user approval.

## Template

```md
# <Task Name>

- Repo:
- Task:
- Status: active | paused | complete | blocked
- Created:
- Updated:

## Goal

## Plan

- [ ] P1 - Reviewable chunk
- [ ] P2 - Reviewable chunk

## Plan Changes

### YYYY-MM-DD
- Added:
- Removed:
- Changed:
- Why:

## Plan Notes

### P1 - Reviewable chunk

- Status:
- Request:
- Work:
- Rationale:
- Tradeoffs:
- Sources:
- Tests:
- Verification:
- Follow-ups:
```

## Plan Rules

- Keep `## Plan` as checkbox chunks that could be committed or reviewed.
- Use stable IDs: `P1`, `P2`, `P3`.
- Keep IDs stable when titles change.
- Add, remove, split, or merge chunks as the work changes.
- Record meaningful changes under `## Plan Changes`.
- Put details under `## Plan Notes` using the same IDs.

## Source Rules

- Use Markdown links.
- Prefer public repo links when available.
- Use repo-relative text when no public URL is known.
- Avoid machine-local absolute paths.
- Link files used to make decisions.
- Link tests used as evidence.
- Link external docs only when they affected the plan or implementation.
- Redact secrets, tokens, private identifiers, and sensitive query params.

Examples:

```md
- Source: [implementation file](https://github.com/<owner>/<repo>/blob/main/src/file.ts)
- Source: [test file](https://github.com/<owner>/<repo>/blob/main/tests/file.test.ts)
- Source: `<repo-id>/src/file.ts`
```

## Verification Rules

- Include exact commands run.
- Include result and exit status when known.
- Say `Not verified` when no check was run.
- Explain why tests were added when test coverage changes.

## Tradeoff Rules

- Record the choice made.
- Record the cost.
- Record the reason the cost was accepted.
- Record rejected alternatives when useful.
