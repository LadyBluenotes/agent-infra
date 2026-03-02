# Errors and Retries

## Retry Rules

- Retry only transient failures: 429 and 5xx.
- Do not retry 4xx validation errors.
- Use exponential backoff with jitter.

```typescript
async function withRetry(fn, maxRetries = 3) {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      const status = (error as any)?.status ?? (error as any)?.statusCode;
      if (![429, 500, 502, 503, 504].includes(status)) throw error;
      if (attempt >= maxRetries) throw error;
      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 250;
      await new Promise(r => setTimeout(r, delay));
      attempt += 1;
    }
  }
}
```

## Common Failures

- 401/403: bad key or missing auth header
- 404: invalid model id
- 429: rate limited
- 5xx: provider or gateway issue
