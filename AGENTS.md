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

### Routing Guide

- Docs: writing or editing documentation content.
- Code: implementing features, fixes, refactors, tooling, or UI.
- Code Quality: simplifying or refactoring recently changed code for clarity.
- Review: reviewing code changes or providing feedback on implementations.
- Debugging: investigating failures, errors, or unexpected behavior.
- Performance: performance, observability, scalability, or optimization work.
- SEO: auditing or diagnosing SEO issues.
- Research: open-ended investigation or comparative analysis.

### Docs

- Apply when writing or editing documentation.
- @docs/index.md
- @agents/docs.md

### Code

- Apply when implementing or changing code.
- @code/index.md
- @rules/style.md
- Use @agents/typescript.md for JavaScript/TypeScript/Node work.
- For UI/UX or frontend tasks, also apply @skills/code/accessibility.md.

### Code Quality

- Apply when simplifying or refining code without changing behavior.
- @agents/code-simplifier.md

### Review

- Apply when reviewing code changes or giving feedback.
- @review/index.md
- Use @agents/typescript.md for JavaScript/TypeScript/Node review.
- For UI/UX or frontend reviews, include @skills/code/accessibility.md.
- For visual/UI validation, include @agents/ui-visual-validator.md.

### Debugging

- Apply when diagnosing errors, test failures, or unexpected behavior.
- @agents/debugger.md
- @agents/error-detective.md

### Performance

- Apply when optimizing performance, scalability, or observability.
- @agents/performance-engineer.md

### SEO

- Apply when auditing or diagnosing SEO issues.
- @agents/seo-audit.md

### Research

- Apply when doing exploratory or comparative research.
- @research/index.md

