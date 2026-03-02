---
name: skills/libraries/openrouter/known-pitfalls
description: Known OpenRouter integration pitfalls and how to avoid them.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://claudecodeplugins.io/learn/openrouter/
---

# Known Pitfalls

## Setup

- Review common failure modes before launch.

## Core Patterns

- Validate model ids on startup.
- Use retries only for 429/5xx.
- Keep API keys server-side only.

## Common Mistakes

- Treating 404 as a transient error
- Logging full prompts in production
