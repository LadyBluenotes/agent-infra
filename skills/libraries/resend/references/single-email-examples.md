# Single Email Examples (Node.js)

## Basic Send

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({ userId, email }) {
  const { data, error } = await resend.emails.send(
    {
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Acme',
      html: '<p>Thanks for signing up!</p>',
    },
    { idempotencyKey: `welcome-email/${userId}` }
  );

  if (error) throw error;
  return data.id;
}
```

## With Attachments

```typescript
import { readFile } from 'node:fs/promises';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInvoice({ userId, email }) {
  const file = await readFile('./invoices/invoice-123.pdf');

  const { data, error } = await resend.emails.send(
    {
      from: 'Acme <billing@resend.dev>',
      to: [email],
      subject: 'Your invoice',
      html: '<p>Invoice attached.</p>',
      attachments: [
        {
          filename: 'invoice-123.pdf',
          content: file,
        },
      ],
    },
    { idempotencyKey: `invoice/${userId}/123` }
  );

  if (error) throw error;
  return data.id;
}
```

## With Retry

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWithRetry(payload, idempotencyKey) {
  const maxRetries = 3;
  let attempt = 0;

  while (true) {
    const { data, error } = await resend.emails.send(payload, { idempotencyKey });

    if (!error) return data;
    if (![429, 500].includes(error.statusCode)) throw error;
    if (attempt >= maxRetries) throw error;

    const delay = Math.pow(2, attempt) * 1000 + Math.random() * 250;
    await new Promise(resolve => setTimeout(resolve, delay));
    attempt += 1;
  }
}
```
