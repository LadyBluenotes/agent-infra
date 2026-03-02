# Requests (OpenRouter)

## Base URL

```
https://openrouter.ai/api/v1
```

## Required Headers

- `Authorization: Bearer $OPENROUTER_API_KEY`
- `Content-Type: application/json`

## Optional Attribution Headers

- `HTTP-Referer`: the site/app URL
- `X-OpenRouter-Title`: the app name

## Chat Completions (JSON)

```json
{
  "model": "openai/gpt-4.1-mini",
  "messages": [
    { "role": "user", "content": "Hello" }
  ],
  "stream": false
}
```

## Notes

- `model` is a provider/model identifier from OpenRouter.
- `messages` follow the standard role/content format.
- Use `stream: true` for SSE responses.
