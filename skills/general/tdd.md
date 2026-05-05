---
name: skills/general/tdd
description: >
  Test-driven development workflow for red-green-refactor, tracer-bullet
  vertical slices, behavior-first tests, public interfaces, and refactoring
  only after tests pass.
type: sub-skill
category: general
aliases:
  - tdd
  - red-green-refactor
tags:
  - testing
  - tdd
  - red-green-refactor
sources:
  - https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md
---

# Test-Driven Development

## Setup

Use this when the user asks for TDD, test-first work, red-green-refactor, or a
bug fix where a focused failing check can be created before the patch.

## Core Patterns

### Work in vertical slices

```text
RED: one behavior test fails
GREEN: smallest code change passes that test
REFACTOR: cleanup only while green
```

Build one tracer bullet at a time. Do not write a batch of imagined tests before
proving the first path.

### Test public behavior

```ts
test("resolved skill ids load the matching skill", async () => {
  const result = await resolveSkillUse(scan, "skills/tooling/vitest/config");
  expect(result.status).toBe("resolved");
});
```

Tests should cross the same interface callers use. Prefer behavior and contract
over private functions, call counts, or internal file shape.

### Keep red and green narrow

```text
One new failing check.
One small implementation step.
Same check passes.
```

Each cycle should teach the next step. If the test needs large setup, first look
for a better seam or a smaller contract.

### Refactor after green

```text
All focused checks pass -> remove duplication, improve names, deepen module.
Any check fails -> stop refactoring and restore green.
```

Refactoring while red hides whether the failure is from behavior or cleanup.

## Common Mistakes

### HIGH Horizontal test batches

```text
Wrong: write five tests, then implement all five behaviors.
Correct: write one test, pass it, then choose the next behavior.
```

Bulk tests lock in guessed design before the implementation has taught you
where the useful interface lives.

### HIGH Testing implementation details

```text
Wrong: assert that an internal helper was called twice.
Correct: assert the observable result that callers depend on.
```

Tests coupled to internals fail during harmless refactors and can pass while the
real behavior is broken.

### MEDIUM Refactoring while red

```text
Wrong: cleanup begins before the focused check passes.
Correct: make the check pass first, then cleanup in small green steps.
```

Red tests should identify one behavior gap, not a moving mix of feature work and
cleanup.
