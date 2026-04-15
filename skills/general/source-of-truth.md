---
name: skills/general/source-of-truth
description: Prevent unsupported factual claims by requiring source-backed, verified, inferred, or unknown claim handling across code, research, docs, and current facts.
type: sub-skill
category: general
---

# Source Of Truth

## Setup
Use this before answering factual questions, explaining code behavior, researching current facts, recommending actions, or making completion claims.

## Core Patterns

### Classify claims
Sort factual claims as source-backed, verified, inferred, or unknown. Do not present inference as fact.

### Code truth
Read exact files before code claims. Read call sites before shared behavior changes. Read tests before expected behavior claims.

### External truth
Use primary sources first. Use official docs for APIs, libraries, and current behavior. Use live tools for volatile facts.

### Missing truth
Say `Unknown` when no source exists. Say `Not verified` when behavior was not checked.

## Common Mistakes

### Guessing through gaps
Wrong
```text
"This probably uses the default config."
```
Correct
```text
"Unknown. I have not found the config source."
```
Explanation: Likely answers are still unsupported claims.

### Inferring code behavior from names
Wrong
```text
"PackageManagerTabs only controls package manager selection."
```
Correct
```text
"I read the component and it controls package manager selection plus install command rendering."
```
Explanation: File names and component names are hints, not sources.

### Treating memory as current truth
Wrong
```text
"The latest release is 1.2.0."
```
Correct
```text
"Unknown until checked against the official release source."
```
Explanation: Current facts need live or primary sources.
