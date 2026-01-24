## Contract (Always On)

- Priorities: correctness/safety > clarity > maintainability > minimal tokens/churn.
- Mode: deliver output directly (draft/patch/review); read before editing; avoid drive-by changes.
- Unknowns: do not guess; state uncertainty; ask only when blocked.

## File Loading Protocol

CRITICAL: This file references other instruction files using @ paths (e.g., @contexts/global.md).
When you see a @ reference:
1. Convert @path/to/file.md to path/to/file.md
2. Resolve relative to this repo root (the directory containing AGENTS.md)
3. Use Read to load files listed under Always Apply immediately
4. Load routing-specific files only when their routing section applies

Always Apply (Global) files to load immediately:
- @contexts/global.md
- @rules/security.md
- @rules/git.md

## Recommendation Prompt

If the user's request suggests a new rule, agent, or skill would be appropriate,
recommend adding it and provide a short example of the entry (name, purpose,
and where it should be routed or referenced).

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
- @skills/docs/index.md
- @agents/docs.md

### Code

- Apply when implementing or changing code.
- @skills/code/index.md
- @rules/style.md
- Use @agents/typescript.md for TypeScript-heavy work.
- Use @agents/javascript.md for JavaScript-only work.
- Use @agents/solid.md for SolidJS/SolidStart work.
- For UI/UX or frontend tasks, also apply @skills/code/accessibility.md.

### Code Quality

- Apply when simplifying or refining code without changing behavior.
- @skills/code/simplify.md
- @agents/code-simplifier.md

### Review

- Apply when reviewing code changes or giving feedback.
- @skills/review/index.md
- Use @agents/typescript.md for JavaScript/TypeScript/Node review.
- For UI/UX or frontend reviews, include @skills/code/accessibility.md.
- For visual/UI validation, include @agents/ui-visual-validator.md.

### Debugging

- Apply when diagnosing errors, test failures, or unexpected behavior.
- @skills/debug/index.md
- @agents/debugger.md
- @agents/error-detective.md

### Performance

- Apply when optimizing performance, scalability, or observability.
- @skills/code/performance.md
- @agents/performance-engineer.md

### SEO

- Apply when auditing or diagnosing SEO issues.
- @skills/seo/audit.md
- @agents/seo-audit.md

### Research

- Apply when doing exploratory or comparative research.
- @skills/research/index.md
