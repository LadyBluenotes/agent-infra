# Email Capture

## Validation

- Validate on client and server
- Check RFC 5322 format
- Optional: DNS/MX lookup and disposable domain blocklist

## Opt-In

| Model | Best for | Notes |
|------|----------|-------|
| Single opt-in | Transactional or low-risk lists | Faster signups, more risk |
| Double opt-in | Marketing | Higher quality list, fewer complaints |

Recommended: double opt-in for marketing lists.

## Double Opt-In Flow

1. User submits email
2. Send confirmation email immediately
3. Confirmation link expires in 24-48 hours
4. Allow resend after 60 seconds
5. Limit to 3 attempts/hour

## UX Guidelines

- Use `type="email"` inputs
- Avoid pre-checked consent boxes
- Explain what users will receive
- Separate consent per email type
- Avoid account enumeration in errors

## Security

- Rate limit form submissions
- Use CAPTCHA sparingly
