---
name: skills/preferences/testing
description: >
  Personal testing preferences for behavior-focused tests, focused regression
  coverage, explicit verification claims, and Vitest-style unit tests.
type: skill
category: preferences
depth: primary
tags:
  - preferences
  - testing
  - vitest
references:
  - skills/tooling/vitest/testing-patterns
  - skills/tooling/vitest/ref/cli
sources:
  - AGENTS.md
---

# Testing Preferences

## Setup

Use this when choosing test shape and verification language.

## Core Patterns

### Test the contract that changed

```ts
expect(resolveSkillUse(scan, 'pkg#skill')).toMatchObject({
  status: 'resolved',
})
```

Prefer public behavior and regressions over private implementation details.

### Name verification scope

```text
Focused tests pass: `npm test -- tests/helpers.test.mjs`.
Full suite not run.
```

Completion claims should match the command that actually ran.

### Add tests where behavior risk exists

```text
CLI behavior change -> CLI/helper tests.
Markdown-only skill change -> diff check and discovery command can be enough.
```

Scale tests to the blast radius.

## Common Mistakes

### HIGH Saying "tests pass" after a partial run

```text
Wrong: "Tests pass."
Correct: "Focused helper tests pass; full suite not run."
```

Avoid broader claims than the evidence supports.
