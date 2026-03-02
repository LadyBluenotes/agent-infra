# Attribution Headers

OpenRouter supports optional headers for usage attribution and leaderboard display.

## Headers

- `HTTP-Referer`: your app/site URL
- `X-OpenRouter-Title`: your app name

## Example

```typescript
const headers = {
  Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
  'Content-Type': 'application/json',
  'HTTP-Referer': 'https://yourapp.example',
  'X-OpenRouter-Title': 'Your App',
};
```
