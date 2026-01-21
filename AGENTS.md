## Contract (Always On)

- Priorities: correctness/safety > clarity > maintainability > minimal tokens/churn.
- Mode: deliver output directly (draft/patch/review); read before editing; avoid drive-by changes.
- Unknowns: do not guess; state uncertainty; ask only when blocked.

## Merge Semantics (Global + Local)

- This repo is intended to be loaded globally.
- If a local repo has its own `AGENTS.md`, merge it with this one.
- Precedence: local overrides global on conflicts; local routing runs first.
- De-dup: local should add repo-specific deltas; do not restate global rules.

## Always Apply (Global)

- @contexts/global.md
- @rules/security.md
- @rules/git.md

## Routing (Global Fallback)

### Docs

- @docs/index.md
- @agents/docs.md

### Code

- @code/index.md
- @rules/style.md
- Use @agents/typescript.md for JavaScript/TypeScript/Node work.
- For UI/UX or frontend tasks, also apply @skills/code/accessibility.md.

### Review

- @review/index.md
- Use @agents/typescript.md for JavaScript/TypeScript/Node review.
- For UI/UX or frontend reviews, include @skills/code/accessibility.md.

### Research

- @research/index.md

