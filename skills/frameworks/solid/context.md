---
name: skills/frameworks/solid/context
description: Context creation and provider usage.
type: sub-skill
category: frameworks
library: solidjs
library_version: "1.8"
sources:
  - https://docs.solidjs.com/concepts/context
---

# Context

## Setup

```jsx
import { createContext, useContext } from "solid-js";

const ThemeContext = createContext("light");

const ThemeProvider = (props) => (
  <ThemeContext.Provider value={props.value}>
    {props.children}
  </ThemeContext.Provider>
);

const useTheme = () => useContext(ThemeContext);
```

## Core Patterns

### Provide typed defaults

```jsx
const ConfigContext = createContext({ apiBase: "/api" });
```

### Small providers near usage

```jsx
<ThemeProvider value="dark"><App /></ThemeProvider>
```

## Common Mistakes

### HIGH: Using context outside a provider

```jsx
// Wrong
const theme = useContext(ThemeContext);
```

```jsx
// Correct
<ThemeProvider value="dark"><App /></ThemeProvider>
```
