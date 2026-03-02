# Resend Sending Best Practices (Node.js)

Use this as a production-ready checklist for any email send.

## Idempotency

Always set an idempotency key for every send. It prevents accidental double-sends on retries.

**Format**

- Single email: `<event-type>/<entity-id>` (e.g., `welcome-email/user-123`)
- Batch email: `batch-<event-type>/<batch-id>` (e.g., `batch-orders/batch-456`)

**Rules**

- Max length: 256 chars
- Expires after 24 hours
- Same key + same payload → returns original response without resending
- Same key + different payload → 409 error

```typescript
const { data, error } = await resend.emails.send(
  { from, to, subject, html },
  { idempotencyKey: `welcome-email/${userId}` }
);
```

## Error Handling

| Code | Meaning | Action |
|------|---------|--------|
| 400 / 422 | Validation error | Fix request. Do not retry. |
| 401 / 403 | Auth/domain error | Fix API key or verify domain. Do not retry. |
| 409 | Idempotency conflict | Change key or fix payload. |
| 429 | Rate limited | Retry with backoff. |
| 500 | Server error | Retry with backoff. |

## Retry Logic

- Retry only 429 and 500
- Exponential backoff with jitter (1s, 2s, 4s...)
- 3-5 attempts max
- Always reuse the same idempotency key on retries

```typescript
async function sendWithRetry(payload, idempotencyKey) {
  const maxRetries = 3;
  let attempt = 0;

  while (true) {
    const { data, error } = await resend.emails.send(payload, { idempotencyKey });
    if (!error) return data;

    if (![429, 500].includes(error.statusCode)) throw error;
    if (attempt >= maxRetries) throw error;

    const delay = Math.pow(2, attempt) * 1000 + Math.random() * 250;
    await new Promise(r => setTimeout(r, delay));
    attempt += 1;
  }
}
```

## Batch-Specific Notes

- Validate every email before sending (one invalid email fails the whole batch).
- Max 100 emails per batch.
- Max 50 recipients per email.
- No attachments or scheduling in batch.
- Chunk large batches to 100 and use unique idempotency keys per chunk.

## Common Errors

- `invalid_idempotency_key`: key too long or bad format
- `invalid_idempotent_request`: same key used with different payload
- `concurrent_idempotent_requests`: same key used simultaneously
