---
name: skills/libraries/resend/email-best-practices
description: Use for email deliverability, compliance, capture, list hygiene, reliability, and webhook best practices for product and marketing emails.
type: core
category: libraries
library: resend
library_version: "main"
sources:
  - https://github.com/resend/email-best-practices
---

# Email Best Practices

## Setup

- Confirm whether the email is **transactional** or **marketing**
- Ensure SPF, DKIM, and DMARC are configured for the sending domain
- Decide on opt-in model (single vs double) for marketing lists

## Core Patterns

### Choose the Right Email Type

- **Transactional**: required for user activity (password reset, receipt)
- **Marketing**: promotional content (newsletter, announcements)
- **Do not mix** transactional and marketing in the same email

See [references/email-types.md](references/email-types.md).

### Deliverability Basics

- **Authenticate**: SPF, DKIM, DMARC
- **Align domains**: links match the sender domain
- **Keep size < 102KB** to avoid Gmail clipping
- **Avoid "no-reply"**; set a real reply-to

See [references/deliverability.md](references/deliverability.md).

### Reliable Sending

- Use deterministic idempotency keys
- Retry only 429/5xx with exponential backoff
- Use timeouts and queues for resilience

See [references/sending-reliability.md](references/sending-reliability.md).

### Compliance and Unsubscribe

- Include physical address and sender identity
- Provide one-click unsubscribe for marketing
- Honor unsubscribe within 48 hours

See [references/compliance.md](references/compliance.md).

### List Hygiene

- Suppress hard bounces and complaints immediately
- Remove soft bounces after 3+ failures
- Re-engage inactive users before removal

See [references/list-management.md](references/list-management.md).

### Marketing Emails

- Require explicit consent
- Keep subject lines short and specific
- Make the unsubscribe link obvious

See [references/marketing-emails.md](references/marketing-emails.md).

### Transactional Emails

- Send immediately
- Put the CTA above the fold
- Use clear subjects and preheaders

See [references/transactional-emails.md](references/transactional-emails.md).

### Webhooks

- Verify signatures on every webhook
- Process events idempotently
- Back off on failures

See [references/webhooks-events.md](references/webhooks-events.md).

## Common Mistakes

- Sending marketing content as transactional
- No unsubscribe flow for marketing
- Not verifying webhook signatures
- Retrying 4xx errors
- Sending large bursts from new domains without warm-up

## References

- references/deliverability.md
- references/transactional-emails.md
- references/transactional-email-catalog.md
- references/marketing-emails.md
- references/email-capture.md
- references/compliance.md
- references/email-types.md
- references/sending-reliability.md
- references/webhooks-events.md
- references/list-management.md
