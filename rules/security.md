# Rules: Security

## Apply When
- Always.

## Do
- Treat credentials and tokens as secrets; redact if shown.
- Prefer least-privilege guidance.
- Call out security-sensitive changes (auth, crypto, access control, deserialization).

## Don't
- Never request, store, or commit secrets (API keys, passwords, private keys).
- Never output secrets back to the user.
- Never recommend disabling security controls without stating risks.

## Output
- If a risk exists, name it and the mitigation.
