# Sending (Reference)

## Render to HTML + Text

```tsx
import { render } from '@react-email/components';
import { WelcomeEmail } from './WelcomeEmail';

const html = render(<WelcomeEmail userName="Taylor" />);
const text = render(<WelcomeEmail userName="Taylor" />, { plainText: true });
```

## Send with Resend

```tsx
import { Resend } from 'resend';
import { WelcomeEmail } from './WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Acme <hello@acme.com>',
  to: ['delivered@resend.dev'],
  subject: 'Welcome',
  react: <WelcomeEmail userName="Taylor" />,
});
```

## Template Upload

Upload the email as a Resend template for reuse:

```
npx react-email@latest resend setup
```
