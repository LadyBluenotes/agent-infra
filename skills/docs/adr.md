---
name: skills/docs/adr
description: >
  ADR guidance for recording hard-to-reverse, surprising, tradeoff-driven
  technical decisions in short source-backed decision records.
type: skill
category: docs
depth: primary
aliases:
  - adr
  - architecture decision record
tags:
  - docs
  - adr
  - decisions
sources:
  - https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/ADR-FORMAT.md
---

# Architecture Decision Records

## Setup

Use this when a technical decision needs durable context beyond code comments,
work logs, or issue comments.

## Core Patterns

### Apply the three-part gate

```text
Record an ADR only when the decision is:
- hard to reverse
- surprising without context
- a real tradeoff between viable options
```

If any part is missing, prefer a normal note, issue comment, or no record.

### Keep the record short

```md
# Use Postgres for the Read Model

We will project read data into Postgres because the query patterns need indexed
relational joins and the existing event stream is optimized for writes.
```

One paragraph is enough when it captures context, decision, and why.

### Preserve rejected alternatives when useful

```md
## Considered Options

- SQLite: simpler deployment, but lacks the target concurrent write profile.
- Elasticsearch: strong search, but unnecessary for relational reads.
```

Add optional sections only when the omitted context would cause the decision to
be re-litigated later.

### Number consistently

```text
docs/adr/0001-use-postgres-for-read-model.md
docs/adr/0002-keep-local-skill-metadata-generated.md
```

Scan existing ADRs before choosing the next number. Create the directory only
when the user has confirmed the write.

## Common Mistakes

### HIGH Recording obvious or reversible choices

```text
Wrong: ADR for a small helper name.
Correct: ADR for a storage, auth, boundary, or deployment choice with lock-in.
```

Too many low-value records make the important decisions harder to find.

### HIGH Writing ADRs before the decision exists

```text
Wrong: document a speculative architecture option as accepted.
Correct: record the decision after the tradeoff is resolved.
```

ADRs preserve decisions; they should not launder guesses into source truth.

### MEDIUM Hiding the tradeoff

```text
Wrong: "We chose X because it is better."
Correct: "We chose X over Y because the repo optimizes for Z."
```

Future readers need the constraint that made the decision reasonable.
