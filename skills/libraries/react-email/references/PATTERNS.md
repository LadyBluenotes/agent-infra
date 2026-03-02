# Patterns (Reference)

## Password Reset

```tsx
import { Html, Head, Body, Container, Heading, Text, Button } from '@react-email/components';

export function PasswordReset({ resetUrl }: { resetUrl: string }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Heading>Reset your password</Heading>
          <Text>This link expires in 20 minutes.</Text>
          <Button href={resetUrl}>Reset password</Button>
        </Container>
      </Body>
    </Html>
  );
}
```

## Order Confirmation Summary

```tsx
import { Html, Head, Body, Container, Text } from '@react-email/components';

export function OrderConfirmation({ orderId, total }: { orderId: string; total: string }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Text>Order #{orderId} confirmed.</Text>
          <Text>Total: {total}</Text>
        </Container>
      </Body>
    </Html>
  );
}
```
