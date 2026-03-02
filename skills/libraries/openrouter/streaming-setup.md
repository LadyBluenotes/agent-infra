---
name: skills/libraries/openrouter/streaming-setup
description: Stream OpenRouter responses in a Node.js/TypeScript app.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://openrouter.ai/docs/quickstart
  - https://claudecodeplugins.io/learn/openrouter/
---

# Streaming Setup

## Setup

- Use the direct API for raw SSE control.

## Core Patterns

```typescript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ model, messages, stream: true }),
});

if (!response.body) throw new Error('No response body');
```

See [references/streaming.md](references/streaming.md).

## Common Mistakes

- Parsing SSE data as a single JSON blob
- Forgetting to handle partial lines across chunks
