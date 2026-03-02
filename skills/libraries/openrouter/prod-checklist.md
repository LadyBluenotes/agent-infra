---
name: skills/libraries/openrouter/prod-checklist
description: Production checklist for OpenRouter usage in TypeScript apps.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://openrouter.ai/docs/quickstart
  - https://claudecodeplugins.io/learn/openrouter/
---

# Production Checklist

## Setup

- Ensure `OPENROUTER_API_KEY` is set in prod.

## Core Patterns

- Log status code + model id per request.
- Add retries for 429/5xx only.
- Use timeouts and abort controllers.
- Track usage per environment.
- Add fallbacks for critical paths.

## Common Mistakes

- No retry/backoff strategy
- Missing request timeouts
- No fallback model
