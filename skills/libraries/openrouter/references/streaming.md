# Streaming (Node.js)

## Basic SSE Read Loop

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

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  const chunk = decoder.decode(value, { stream: true });
  // parse SSE lines here
}
```

## Cancellation

```typescript
const controller = new AbortController();
const response = await fetch(url, { signal: controller.signal, ...options });

// later
controller.abort();
```

## Tips

- Handle partial lines across chunks.
- Stop on a `[DONE]` style sentinel if present.
- Always close readers on errors.
