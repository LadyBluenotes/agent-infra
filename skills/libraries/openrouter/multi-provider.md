---
name: skills/libraries/openrouter/multi-provider
description: Use multiple providers through OpenRouter with a single integration.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://claudecodeplugins.io/learn/openrouter/
---

# Multi-Provider

## Setup

- Treat provider choice as a configuration input.

## Core Patterns

- Keep provider/model ids centralized.
- Separate provider-specific quirks from call sites.

## Common Mistakes

- Hardcoding provider ids throughout the codebase
- Not testing fallback provider behavior
