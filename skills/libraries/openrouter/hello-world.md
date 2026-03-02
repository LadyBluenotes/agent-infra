---
name: skills/libraries/openrouter/hello-world
description: Send a basic chat completion with the OpenRouter TypeScript SDK.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://openrouter.ai/docs/quickstart
  - https://claudecodeplugins.io/learn/openrouter/
---

# Hello World

## Setup

- Install the SDK and set `OPENROUTER_API_KEY`.

## Core Patterns

```typescript
import OpenRouter from '@openrouter/sdk';

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const response = await openrouter.chat.send({
  model: 'openai/gpt-4.1-mini',
  messages: [{ role: 'user', content: 'Say hello in one sentence.' }],
  stream: false,
});

console.log(response.choices[0]?.message?.content);
```

## Common Mistakes

- Using the wrong base URL (SDK handles it)
- Passing an invalid model id
- Forgetting to set `OPENROUTER_API_KEY`

## References

- references/requests.md
