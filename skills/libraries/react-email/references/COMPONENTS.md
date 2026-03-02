# Components (Reference)

## Core Components

- `Html`, `Head`, `Body`
- `Container`, `Section`, `Row`, `Column`
- `Heading`, `Text`, `Button`, `Link`, `Img`, `Hr`
- `Preview`, `Tailwind`

## Example Structure

```tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Button,
} from '@react-email/components';

export function BasicEmail() {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Heading>Welcome</Heading>
            <Text>Thanks for joining.</Text>
            <Row>
              <Column>
                <Button href="https://acme.com">Get started</Button>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

## Preview

```tsx
BasicEmail.PreviewProps = {
  userName: 'Taylor',
};
```

## Tailwind Notes

- Keep `Head` inside `Tailwind`
- Use `pixelBasedPreset`
