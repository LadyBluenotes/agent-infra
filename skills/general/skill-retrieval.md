---
name: skills/general/skill-retrieval
description: Mapping prompts to skills and recording retrieval rationale.
type: sub-skill
category: general
---

# Skill Retrieval

## Setup
Use this when deciding which skill modules to load for a user prompt.

## Core Patterns

### Identify intent first
Classify the request (code, docs, review, debug, performance, research, seo) before loading skills.

### Match the smallest skill
Start with the most specific top-level skill, then load only the sub-skills needed.

### Record the mapping
Capture the prompt pattern, chosen skills, and rationale in `notes/skill-retrieval.md`.

### Avoid overloading
Skip unrelated skills even if they are adjacent or familiar.

## Common Mistakes

### Loading too much
Wrong
```text
"Loaded every skill in a category to be safe."
```
Correct
```text
"Loaded only the top-level skill and one sub-skill needed for the task."
```
Explanation: Minimal loading reduces noise and keeps the response focused.

### Skipping the log
Wrong
```text
"Chose skills but did not record the prompt pattern."
```
Correct
```text
"Added a brief prompt-to-skill note for future retrieval."
```
Explanation: The log helps improve routing decisions over time.
