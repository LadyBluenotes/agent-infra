---
name: skills/libraries/openrouter/team-setup
description: Team setup considerations for OpenRouter in a TS codebase.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://claudecodeplugins.io/learn/openrouter/
---

# Team Setup

## Setup

- Use separate keys per environment.

## Core Patterns

- Store keys in your secret manager.
- Provide a shared config for model ids.

## Common Mistakes

- Sharing a single key across dev/staging/prod
- Hardcoding keys in local files
