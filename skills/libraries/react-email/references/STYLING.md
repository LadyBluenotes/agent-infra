# Styling (Reference)

## Rules

- Use Tailwind with `pixelBasedPreset`
- Avoid flexbox and grid (use Row/Column)
- Avoid media queries and dark-mode selectors unless requested
- Avoid SVG/WEBP images
- Always set border styles (e.g., `border-solid`)

## Default Layout

```tsx
<Body className="bg-gray-100 font-sans">
  <Container className="mx-auto max-w-[600px] bg-white p-6">
    <Text className="text-base leading-6 text-gray-900">Hello</Text>
  </Container>
</Body>
```

## Buttons

```tsx
<Button className="box-border rounded bg-black px-4 py-2 text-white">
  View details
</Button>
```

## Images

- Use absolute URLs in production
- Always include `alt`
