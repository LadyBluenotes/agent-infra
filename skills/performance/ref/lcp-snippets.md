---
name: skills/performance/ref/lcp-snippets
description: >
  LCP JavaScript snippet reference for Chrome DevTools MCP evaluate_script:
  identify the LCP element and audit common DOM-based LCP issues.
type: reference
category: performance
depth: reference
aliases:
  - lcp snippets
tags:
  - lcp
  - snippets
  - chrome
  - devtools
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/debug-optimize-lcp/references/lcp-snippets.md
---

# LCP Debugging Snippets

Use these JavaScript snippets with the `evaluate_script` tool.

## Identify LCP element

```js
async () => {
  return await new Promise(resolve => {
    new PerformanceObserver(list => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      resolve({
        element: last.element?.tagName,
        id: last.element?.id,
        className: last.element?.className,
        url: last.url,
        startTime: last.startTime,
        renderTime: last.renderTime,
        loadTime: last.loadTime,
        size: last.size,
      });
    }).observe({type: 'largest-contentful-paint', buffered: true});
  });
};
```

## Audit common issues

```js
() => {
  const issues = [];

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      issues.push({
        issue: 'lazy-loaded image in viewport',
        element: img.outerHTML.substring(0, 200),
        fix: 'Remove loading="lazy" from this image; it is in the initial viewport and may be the LCP element',
      });
    }
  });

  document.querySelectorAll('img:not([fetchpriority])').forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.width * rect.height > 50000) {
      issues.push({
        issue: 'large viewport image without fetchpriority',
        element: img.outerHTML.substring(0, 200),
        fix: 'Add fetchpriority="high" to this image if it is the LCP candidate',
      });
    }
  });

  document
    .querySelectorAll(
      'head script:not([async]):not([defer]):not([type="module"])',
    )
    .forEach(script => {
      if (script.src) {
        issues.push({
          issue: 'render-blocking script in head',
          element: script.outerHTML.substring(0, 200),
          fix: 'Add async or defer, or move the script to the end of body',
        });
      }
    });

  return {issueCount: issues.length, issues};
};
```
