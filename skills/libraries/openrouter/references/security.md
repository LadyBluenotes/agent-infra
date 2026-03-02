# API Key Security

## Do

- Store keys in `OPENROUTER_API_KEY` env var
- Use server-side calls only
- Rotate keys regularly
- Scope keys per environment if possible

## Avoid

- Hardcoding keys in code or git
- Sending keys to the browser
- Logging full keys
