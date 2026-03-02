# Resend SDK Installation

Use the latest Resend Node.js SDK to ensure support for webhooks verification and inbound email APIs.

## Minimum Version

- Node.js SDK: 6.9.2+

## Install

### Node.js

```bash
npm install resend
```

### pnpm

```bash
pnpm add resend
```

### yarn

```bash
yarn add resend
```

### bun

```bash
bun add resend
```

## Environment

Set the API key once per environment.

```bash
export RESEND_API_KEY="re_..."
```

## cURL Example

```bash
curl -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Acme <onboarding@resend.dev>",
    "to": ["delivered@resend.dev"],
    "subject": "Hello",
    "html": "<p>Hi</p>"
  }'
```
