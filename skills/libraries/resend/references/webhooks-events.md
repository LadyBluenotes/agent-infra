# Webhook Events

## Events

- `email.sent`
- `email.delivered`
- `email.bounced`
- `email.complained`
- `email.opened`
- `email.clicked`

## Handling Guidelines

- Verify signatures for every request
- Process idempotently using the event id
- Respond quickly with 2xx
- Retry failures with backoff

## Retry Schedule

Resend retries webhooks for up to 24 hours:

```
immediate, 5s, 1m, 5m, 30m, 2h, 5h, 10h
```

## Bounce Types

- Hard: invalid address, suppress immediately
- Soft: temporary issue, retry and suppress after repeated failures
