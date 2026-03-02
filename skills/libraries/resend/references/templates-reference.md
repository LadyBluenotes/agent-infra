# Templates Reference (Node.js)

## Create Template

```typescript
const { data, error } = await resend.templates.create({
  name: 'Welcome',
  html: '<p>Hi {{{FIRST_NAME}}}</p>',
  // or react: <WelcomeEmail />
  alias: 'welcome-email',
  from: 'Acme <hello@acme.com>',
  subject: 'Welcome to Acme',
  reply_to: 'support@acme.com',
  text: 'Hi {{{FIRST_NAME}}}',
  variables: [
    { key: 'FIRST_NAME', type: 'string', fallbackValue: 'there' },
  ],
});
```

### Required

- `name`
- `html` or `react`

### Optional

- `alias`, `from`, `subject`, `reply_to`, `text`, `variables`

## Variables

- Syntax: `{{{VARIABLE_NAME}}}`
- Max 50 variables per template
- Key max length: 50
- Key chars: ASCII letters, numbers, underscore
- String value max length: 2000
- Number max: 2^53 - 1

### Missing Variables

- No fallback → send fails with 422
- With fallback → uses fallback value

### Reserved Names

```
FIRST_NAME
LAST_NAME
EMAIL
UNSUBSCRIBE_URL
RESEND_UNSUBSCRIBE_URL
contact
this
```

## List Templates

```typescript
const { data, error } = await resend.templates.list({ after: 'cursor' });
```

Uses cursor pagination with `after`.

## Update Template

```typescript
await resend.templates.update('tmpl_123', { subject: 'New subject' });
```

## Publish Template

```typescript
await resend.templates.publish('tmpl_123');
```

Publish is synchronous.

## Remove (Delete) Template

```typescript
await resend.templates.remove('tmpl_123');
```

## Duplicate Template

```typescript
const { data } = await resend.templates.duplicate('tmpl_123');
await resend.templates.publish(data.id);
```

## Common Mistakes

- Using `{{VAR}}` instead of `{{{VAR}}}`
- Sending a draft template (must publish first)
- Using Handlebars logic (`#each`, `#if`) - unsupported
- Combining `template` with `html`, `text`, or `react`
- Using reserved variable names
- Exceeding 50 variables
