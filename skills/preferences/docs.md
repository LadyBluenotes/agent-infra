---
name: skills/preferences/docs
description: >
  Personal documentation preferences for concise source-backed docs,
  Diataxis-aware edits, context preservation, and avoiding unsupported claims.
type: skill
category: preferences
depth: primary
tags:
  - preferences
  - docs
  - writing
references:
  - skills/docs/reference-editing
  - skills/docs/reference
sources:
  - AGENTS.md
---

# Docs Preferences

## Setup

Use this when editing docs voice and structure. Use docs skills for task-specific doc type.

## Core Patterns

### Preserve useful source-backed context

```text
Before removing text:
- identify the claim
- check whether it is source-backed
- keep or relocate useful behavior detail
```

Template migrations should not erase accurate context.

### Keep reference docs factual

```text
Reference: what it is, parameters, behavior, examples.
Not reference: marketing, speculation, unsourced claims.
```

Use source truth before adding API behavior.

### Prefer concise edits

```text
Change the smallest text needed to fix the issue.
```

Avoid rewriting a whole page when only one claim is wrong.

## Common Mistakes

### HIGH Making docs sound nicer by losing precision

```text
Wrong: replace source-backed behavior with vague summary.
Correct: keep the observable behavior and simplify only the wording.
```

Clarity must not come at the expense of correctness.
