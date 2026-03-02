# Sending Reliability

## Idempotency

- Use deterministic keys (not timestamps)
- Same key + same payload returns original response
- Same key + different payload returns 409
- Keys expire after 24 hours

## Retry Logic

- Retry only 429, 5xx, and timeouts
- Do not retry 4xx validation errors
- Exponential backoff with jitter

## Timeouts

- Set 10-30s timeout per request
- Use AbortController for fetch-based clients

## Queues

- Persist pending sends
- Mark success or failure
- Reprocess failed items with backoff
