---
name: skills/libraries/openrouter/model-routing
description: Route requests to different OpenRouter models based on task needs.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://claudecodeplugins.io/learn/openrouter/
---

# Model Routing

## Setup

- Define routing criteria (latency, cost, quality).

## Core Patterns

```typescript
function routeModel({ task, urgency }: { task: string; urgency: 'low' | 'high' }) {
  if (task === 'summarize' && urgency === 'low') return 'openai/gpt-4.1-nano';
  return 'openai/gpt-4.1-mini';
}
```

## Common Mistakes

- Routing without measuring outcomes
- Using too many models without guardrails
