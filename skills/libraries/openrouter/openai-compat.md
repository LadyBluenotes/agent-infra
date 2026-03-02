---
name: skills/libraries/openrouter/openai-compat
description: Optional OpenAI-compatible usage notes for OpenRouter (only if required).
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://openrouter.ai/docs/quickstart
  - https://claudecodeplugins.io/learn/openrouter/
---

# OpenAI Compatibility (Optional)

## Setup

- Prefer the OpenRouter SDK by default.
- Use OpenAI compatibility only when a library requires it.

## Core Patterns

### Use OpenRouter Base URL

- Base URL: `https://openrouter.ai/api/v1`
- Keep your `OPENROUTER_API_KEY` server-side.

## Common Mistakes

- Using OpenAI SDK without changing the base URL
- Sending the API key to the client
