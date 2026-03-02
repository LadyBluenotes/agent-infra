# Deliverability

## Authentication

Set up SPF, DKIM, and DMARC for every sending domain.

### SPF (example)

```
v=spf1 include:amazonses.com ~all
```

### DKIM

Use the DKIM record provided by your ESP.

### DMARC rollout

1. Start with monitoring:

```
v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
```

2. Move to quarantine:

```
v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc@yourdomain.com
```

3. Enforce reject when stable:

```
v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com
```

## IP/Domain Warmup

Increase volume gradually. Targets: bounce < 4%, complaints < 0.1%.

## Bounce Handling

- Hard bounces: suppress immediately
- Soft bounces: retry later; suppress after 3-5 failures

## List-Unsubscribe (Required)

Bulk senders must include `List-Unsubscribe` headers (Feb 2024 Gmail/Yahoo requirement).

## Troubleshooting Order

1. Auth (SPF/DKIM/DMARC)
2. List-Unsubscribe header
3. Reputation metrics
4. Content and links
5. Sudden volume spikes

## Tools

- Google Postmaster Tools
- mail-tester.com
- MXToolbox
