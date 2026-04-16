---
name: skills/docs/source-audit
description: >
  Source audit workflow for docs and skills where every factual claim must map
  to code truth, command truth, official docs, primary sources, inference, or Unknown.
type: skill
category: docs
depth: primary
aliases:
  - source audit
  - hallucination audit
tags:
  - docs
  - source-backed
  - audit
  - hallucination
references:
  - skills/docs/reference-editing
  - skills/docs/ref/context-preservation
  - skills/general/source-of-truth
sources:
  - https://diataxis.fr/reference/
---

# Source Audit

## Setup

Use this when editing docs, skills, references, or migration notes where unsupported factual claims would be a bug.

## Core Patterns

### Build a claim ledger first

```text
Claim:
Source:
Status: source-backed | verified | inferred | Unknown
Action: keep | rewrite | move | remove
```

Audit claims before rewriting. Missing sources become `Unknown`, not prose to smooth over.

### Separate source types

```text
Code truth: read implementation and tests.
Command truth: run the relevant command.
External truth: use official docs, primary sources, or GitHub tools.
Inference: label it.
```

Use source type in the notes when a claim matters for later review.

### Keep reference pages neutral

```text
Reference owns:
- names
- options
- behavior
- constraints
- examples that clarify exact usage
```

Diataxis frames reference as information-oriented description. Keep opinions and migration rationale out unless the page is explicitly not reference material.

### Preserve removed context deliberately

```sh
git diff -- path/to/file.md
```

Review deleted lines for sourced behavior before completion. Move source-backed details to the closest primary page or `ref/` page instead of dropping them.

## Common Mistakes

### HIGH Source list without claim mapping

```text
Wrong: add a Sources section and assume the page is verified.
Correct: map each important claim to the exact source or mark it Unknown.
```

A source URL is not proof unless it supports the claim being made.

### HIGH Rewriting reference as advice

```text
Wrong: "You should usually configure this for better DX."
Correct: "The option accepts X and changes Y behavior."
```

Reference pages should describe the machinery before giving preferences.

### MEDIUM Treating memory as a source

```text
Wrong: rely on remembered defaults, flags, or version behavior.
Correct: verify against code, command output, or official docs.
```

Memory can guide search, but it is not source truth.
