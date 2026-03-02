---
name: skills/libraries/resend/resend-inbound
description: Use when receiving inbound email with Resend webhooks and fetching email content or attachments via the Resend Node.js SDK.
type: core
category: libraries
library: resend
library_version: "main"
sources:
  - https://github.com/resend/resend-skills/tree/main/resend-inbound
---

# Resend Inbound Email (Node.js)

## Setup

- Install the Node.js SDK: `npm install resend`
- Store your API key in `RESEND_API_KEY`
- Configure a receiving domain (Resend-managed `resend.app` or your own MX)
- Create a webhook endpoint for the `email.received` event

## Core Patterns

### Configure a Receiving Domain

- **Resend-managed**: no DNS changes, fastest to start
- **Custom domain**: set MX record to Resend with **lowest priority**
- Prefer a **subdomain** (e.g., `inbound.acme.com`) to avoid breaking your existing mail

### Verify Webhook Signatures (Required)

Always verify webhook signatures using the raw request body.

```typescript
import express from 'express';
import { Resend } from 'resend';

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/webhooks/resend/inbound', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const event = await resend.webhooks.verify({
      payload: req.body.toString('utf8'),
      headers: {
        'svix-id': req.headers['svix-id'] as string,
        'svix-timestamp': req.headers['svix-timestamp'] as string,
        'svix-signature': req.headers['svix-signature'] as string,
      },
      secret: process.env.RESEND_WEBHOOK_SECRET!,
    });

    if (event.type === 'email.received') {
      const emailId = event.data.email_id;
      // Fetch full content below
    }

    res.status(200).send('ok');
  } catch (error) {
    res.status(400).send('invalid signature');
  }
});
```

### Fetch Email Content

Webhook payloads contain metadata only. Fetch the full email content by ID.

```typescript
const { data, error } = await resend.emails.receiving.get(emailId);
if (error) throw error;

const { subject, from, to, html, text, attachments } = data;
```

### Fetch Attachments

Attachments are retrieved via the receiving attachments API. `download_url` expires after 1 hour.

```typescript
const { data: list, error: listError } = await resend.emails.receiving.attachments.list({
  emailId,
});
if (listError) throw listError;

for (const attachment of list) {
  // attachment.download_url is a signed URL valid for ~1 hour
}
```

### Route by Recipient

Use the `to` field to route messages to the right handler.

```typescript
const recipients = data.to.map(r => r.email.toLowerCase());
if (recipients.includes('support@inbound.acme.com')) {
  // support workflow
}
```

## Common Mistakes

- Expecting the webhook payload to include the email body (it only contains metadata)
- Not verifying webhook signatures with the raw body
- Using a root domain and breaking existing mail delivery
- Setting MX priority higher than existing records
- Fetching attachments after the `download_url` expires
- Returning non-2xx from the webhook handler (causes retries)
