# Batch Email Examples (Node.js)

## Validate + Send Batch

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function validateEmailPayload(payload) {
  const required = ['from', 'to', 'subject'];
  for (const key of required) {
    if (!payload[key]) throw new Error(`Missing ${key}`);
  }
  if (!payload.html && !payload.text) throw new Error('Missing html or text');
  if (!Array.isArray(payload.to) || payload.to.length === 0) throw new Error('Missing to');
  if (payload.to.length > 50) throw new Error('Too many recipients');
}

export async function sendBatch(emails, batchId) {
  if (emails.length > 100) throw new Error('Batch max is 100');
  emails.forEach(validateEmailPayload);

  const { data, error } = await resend.batch.send(
    emails,
    { idempotencyKey: `batch-orders/${batchId}` }
  );

  if (error) throw error;
  return data;
}
```

## Chunk Large Batches

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function chunk(items, size) {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export async function sendLargeBatch(emails, batchId) {
  const chunks = chunk(emails, 100);

  const results = await Promise.all(
    chunks.map((chunkEmails, index) =>
      resend.batch.send(
        chunkEmails,
        { idempotencyKey: `batch-orders/${batchId}/chunk-${index}` }
      )
    )
  );

  return results;
}
```
