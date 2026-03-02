---
name: skills/libraries/openrouter/model-catalog
description: Discover and choose OpenRouter model ids for chat completions in TS.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://openrouter.ai/docs/quickstart
  - https://claudecodeplugins.io/learn/openrouter/
---

# Model Catalog

## Setup

- Use the OpenRouter model list in the dashboard or docs.

## Core Patterns

### Pick a Model Id

- Use the provider/model format (e.g., `openai/gpt-4.1-mini`).
- Choose smaller models for fast iteration, larger for quality.

### Keep Model Choice Configurable

```typescript
const model = process.env.OPENROUTER_MODEL ?? 'openai/gpt-4.1-mini';
```

## Common Mistakes

- Hardcoding a model id that gets deprecated
- Using a model name that is not in OpenRouter
