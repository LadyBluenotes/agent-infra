---
name: skills/libraries/resend/agent-email-inbox
description: Use when building a secure inbound email inbox for an AI agent using Resend webhooks in a Node.js app.
type: core
category: libraries
library: resend
library_version: "main"
sources:
  - https://github.com/resend/resend-skills/tree/main/agent-email-inbox
---

# Agent Email Inbox (Node.js)

## Setup

- Install the Node.js SDK: `npm install resend`
- Store secrets in env vars: `RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET`
- Configure a receiving domain (Resend-managed or custom MX)
- Create a webhook endpoint for `email.received`

## Core Patterns

### 1) Pick a Security Level First

Inbound email is a high-risk input. Decide how strict you want to be.

| Level | Description | When to use |
|-------|-------------|-------------|
| Strict allowlist | Only known senders | Production agent inbox |
| Domain allowlist | Any sender at approved domains | Internal team workflows |
| Content filtering | Strip quoted threads, detect injection | Lower-risk assistants |
| Human-in-the-loop | Agent proposes, human approves | Sensitive actions |

### 2) Verify Webhooks with Raw Body

Use `express.raw` so signature verification works.

```typescript
import express from 'express';
import { Resend } from 'resend';

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/webhooks/resend/agent', express.raw({ type: 'application/json' }), async (req, res) => {
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

    if (event.type !== 'email.received') return res.status(200).send('ok');

    // Fetch and process email body
    const { data, error } = await resend.emails.receiving.get(event.data.email_id);
    if (error) throw error;

    // Apply safety filters before passing to agent
    const safeText = sanitizeEmail(data.text || data.html || '');

    // hand off to agent pipeline
    enqueueAgentTask({
      from: data.from?.email,
      subject: data.subject,
      body: safeText,
    });

    res.status(200).send('ok');
  } catch (error) {
    res.status(400).send('invalid signature');
  }
});
```

### 3) Create the Webhook via API (Recommended)

Create it programmatically and store the returned signing secret.

```typescript
const { data, error } = await resend.webhooks.create({
  url: 'https://example.com/webhooks/resend/agent',
  events: ['email.received'],
});

if (error) throw error;
process.env.RESEND_WEBHOOK_SECRET = data.signing_secret;
```

### 4) Protect the Agent Pipeline

Minimum controls:

- Allowlist senders or domains
- Strip quoted threads and signatures before LLM input
- Rate limit inbound processing
- Log rejections with reason
- Separate trusted vs untrusted actions
- Never execute code or links from email content

## Common Mistakes

- Passing the raw email directly to the agent without sanitization
- Not verifying webhook signatures
- Parsing the body as JSON before verification (breaks signatures)
- Using a non-persistent tunnel URL (webhooks stop working)
- Letting the agent perform actions without a human review for sensitive tasks
