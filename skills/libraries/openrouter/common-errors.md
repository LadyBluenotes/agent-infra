---
name: skills/libraries/openrouter/common-errors
description: Diagnose common OpenRouter errors in TypeScript apps.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://openrouter.ai/docs/quickstart
  - https://claudecodeplugins.io/learn/openrouter/
---

# Common Errors

## Setup

- Capture status code and response body in logs.

## Core Patterns

### Map Status Codes

- 401/403: missing or invalid API key
- 404: invalid model id
- 429: rate limited
- 5xx: provider or gateway error

### Retry Only Transient Failures

See [references/errors-retries.md](references/errors-retries.md).

## Common Mistakes

- Retrying 4xx validation errors
- Treating 404 as a network issue
