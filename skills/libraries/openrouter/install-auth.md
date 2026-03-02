---
name: skills/libraries/openrouter/install-auth
description: Install the OpenRouter SDK and authenticate with an API key in a TypeScript project.
type: core
category: libraries
library: openrouter
library_version: "quickstart"
sources:
  - https://openrouter.ai/docs/quickstart
  - https://claudecodeplugins.io/learn/openrouter/
---

# Install and Authenticate

## Setup

```bash
pnpm add @openrouter/sdk
```

Set your API key in the environment:

```bash
export OPENROUTER_API_KEY="your-key"
```

## Core Patterns

### Initialize the Client

```typescript
import OpenRouter from '@openrouter/sdk';

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://yourapp.example',
    'X-OpenRouter-Title': 'Your App',
  },
});
```

### Keep Keys Server-Side

- Use server-only modules or API routes.
- Never send the key to the browser.

## Common Mistakes

- Missing `OPENROUTER_API_KEY`
- Using a client-side bundle for requests
- Omitting attribution headers when you want leaderboard credit

## References

- references/security.md
- references/attribution.md
