---
name: skills/libraries/openrouter/sdk-patterns
description: Reusable TypeScript patterns for calling OpenRouter with the SDK.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://openrouter.ai/docs/quickstart
  - https://claudecodeplugins.io/learn/openrouter/
---

# SDK Patterns

## Setup

- Initialize one client and reuse it.

## Core Patterns

### Create a Typed Helper

```typescript
import OpenRouter from '@openrouter/sdk';

const client = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

export async function chatOnce(prompt: string) {
  const response = await client.chat.send({
    model: 'openai/gpt-4.1-mini',
    messages: [{ role: 'user', content: prompt }],
    stream: false,
  });

  return response.choices[0]?.message?.content ?? '';
}
```

### Add Attribution Headers

```typescript
const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://yourapp.example',
    'X-OpenRouter-Title': 'Your App',
  },
});
```

## Common Mistakes

- Creating a new client for every request
- Using a client in the browser bundle

## References

- references/attribution.md
- references/security.md
