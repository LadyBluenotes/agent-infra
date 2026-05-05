---
name: skills/review/architecture
description: >
  Architecture-review guidance for finding shallow modules, missing seams,
  poor locality, weak leverage, testability problems, and deep-module refactor
  candidates.
type: sub-skill
category: review
aliases:
  - architecture review
  - deep modules
tags:
  - architecture
  - review
  - refactor
  - testability
sources:
  - https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md
  - https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/LANGUAGE.md
---

# Architecture Review

## Setup

Use this when reviewing architecture, refactor candidates, testability friction,
or requests to make code easier for humans and agents to navigate.

## Core Patterns

### Use stable vocabulary

```text
Module: interface plus implementation.
Interface: everything callers must know to use the module correctly.
Seam: where behavior can vary without editing the caller.
Adapter: concrete implementation at a seam.
Depth: behavior hidden behind a small interface.
```

Use these terms consistently. Avoid swapping in overloaded words when the review
is about module shape.

### Apply the deletion test

```text
Delete module mentally.
If complexity disappears -> likely pass-through.
If complexity spreads into callers -> likely useful depth.
```

Shallow modules often expose nearly as much complexity as they hide.

### Look for leverage and locality

```text
Leverage: one interface gives callers useful behavior.
Locality: changes and bugs concentrate behind that interface.
```

Good refactors make tests cross a better interface and keep related knowledge in
one place.

### Do not invent hypothetical seams

```text
One adapter -> likely hypothetical seam.
Two adapters -> real variation to model.
```

Prefer direct code until current callers or tests prove a seam earns its cost.

## Common Mistakes

### HIGH Proposing interfaces too early

```text
Wrong: start with a new abstraction name and method list.
Correct: first show the friction, files involved, and behavior that needs locality.
```

Architecture review should identify the problem before designing a new module.

### HIGH Deepening without a caller benefit

```text
Wrong: add a wrapper because the implementation looks complex.
Correct: add depth only when callers or tests get a simpler interface.
```

Implementation complexity alone does not justify a new seam.

### MEDIUM Re-litigating recorded decisions

```text
Wrong: suggest an architecture change that contradicts an ADR without evidence.
Correct: surface the conflict only when current friction is strong enough to revisit it.
```

Existing decisions are source truth unless the current code shows a real cost.
