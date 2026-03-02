# Webhooks (Node.js)

## Events

- `email.sent`
- `email.delivered`
- `email.bounced`
- `email.complained`
- `email.opened`
- `email.clicked`
- `email.delivery_delayed`
- `email.failed`

## Signature Verification (Express)

Always verify webhook signatures using the raw body.

```typescript
import express from 'express';
import { Resend } from 'resend';

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/webhooks/resend', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['svix-signature'] as string;
  const timestamp = req.headers['svix-timestamp'] as string;
  const id = req.headers['svix-id'] as string;
  const payload = req.body.toString('utf8');

  try {
    const event = await resend.webhooks.verify({
      payload,
      headers: {
        'svix-id': id,
        'svix-timestamp': timestamp,
        'svix-signature': signature,
      },
      secret: process.env.RESEND_WEBHOOK_SECRET!,
    });

    // idempotent processing by event.id
    switch (event.type) {
      case 'email.delivered':
        // update delivery status
        break;
      case 'email.bounced':
        // suppress address
        break;
      case 'email.complained':
        // suppress + alert
        break;
      default:
        break;
    }

    res.status(200).send('ok');
  } catch (error) {
    res.status(400).send('invalid signature');
  }
});
```

## Retry Behavior

If you return a non-2xx response, Resend retries the webhook for up to 24 hours on this schedule:

```
immediate, 5s, 5m, 30m, 2h, 5h, 10h
```

## Common Mistakes

- Using JSON body parsing instead of `express.raw`
- Not verifying signatures
- Storing the wrong secret
- Returning a non-2xx response on success
