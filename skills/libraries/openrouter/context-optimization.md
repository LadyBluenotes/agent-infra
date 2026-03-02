---
name: skills/libraries/openrouter/context-optimization
description: Optimize context length and prompt content for OpenRouter models.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://claudecodeplugins.io/learn/openrouter/
---

# Context Optimization

## Setup

- Decide max context budget per request.

## Core Patterns

- Strip redundant system text.
- Summarize long histories.
- Keep the latest turns intact.

## Common Mistakes

- Sending full history for every request
- Mixing unrelated threads into one prompt
