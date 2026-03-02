---
name: skills/libraries/react-email/react-email
description: Use when building or editing React Email templates with @react-email/components and Tailwind in a Node.js/TypeScript project.
type: core
category: libraries
library: react-email
library_version: "canary"
sources:
  - https://github.com/resend/react-email/tree/canary/skills/react-email
---

# React Email

## Setup

- Install with `npx create-email@latest`
- Add scripts:

```json
{
  "scripts": {
    "email": "email dev",
    "email:build": "email build"
  }
}
```

- Use `@react-email/components` and Tailwind when possible

## Core Patterns

### Ask for Brand Inputs First

Before building a template, ask for:

- Brand colors
- Logo format (SVG/PNG) and size
- Desired tone (formal, friendly, playful)
- Production static asset URL (CDN)

### Use React Props (No Template Variables in TSX)

```tsx
type WelcomeEmailProps = {
  userName: string;
  trialEndsAt: string;
};

export function WelcomeEmail({ userName, trialEndsAt }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body>
        <Text>Hi {userName}, your trial ends on {trialEndsAt}.</Text>
      </Body>
    </Html>
  );
}

WelcomeEmail.PreviewProps = {
  userName: 'Taylor',
  trialEndsAt: 'Oct 12, 2026',
};
```

### Layout with Tables, Not Flex/Grid

Use `Row` and `Column` (tables) for layout. Avoid flexbox and grid.

```tsx
<Section>
  <Row>
    <Column>Left</Column>
    <Column>Right</Column>
  </Row>
</Section>
```

### Tailwind + pixelBasedPreset

```tsx
import { Tailwind } from '@react-email/components';
import { pixelBasedPreset } from '@react-email/components';

<Tailwind config={{ presets: [pixelBasedPreset] }}>
  <Body className="bg-gray-100 font-sans">
    <Container className="mx-auto bg-white p-6">
      <Text className="text-base leading-6">Hello</Text>
    </Container>
  </Body>
</Tailwind>
```

### Static Assets

- Store images in `emails/static`
- Use absolute URLs in production

```tsx
<Img src={`${baseUrl}/logo.png`} width="120" height="32" alt="Acme" />
```

## Common Mistakes

- Using `{{variable}}` syntax inside TSX instead of props
- Using flexbox or grid for layout
- Adding SVG/WEBP images (not supported by many clients)
- Forgetting to include `Head` inside `Tailwind`
- Using media queries or dark-mode selectors without request

## References

- references/COMPONENTS.md
- references/I18N.md
- references/PATTERNS.md
- references/SENDING.md
- references/STYLING.md
