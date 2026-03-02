---
name: skills/libraries/openrouter/pricing-basics
description: Understand OpenRouter pricing basics and how model choice impacts cost.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://openrouter.ai/docs/quickstart
  - https://claudecodeplugins.io/learn/openrouter/
---

# Pricing Basics

## Setup

- Review model pricing in the OpenRouter catalog.

## Core Patterns

### Make Cost a Config Option

```typescript
const model = process.env.OPENROUTER_MODEL ?? 'openai/gpt-4.1-mini';
```

### Use Smaller Models for Iteration

- Use smaller/cheaper models for dev and tests.
- Switch to larger models for final quality.

## Common Mistakes

- Treating all models as cost-equivalent
- Not tracking usage by environment
