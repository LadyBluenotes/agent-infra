---
name: skills/seo/audit
description: Checklist for diagnosing technical and on-page SEO issues.
type: sub-skill
category: seo
sources:
  - https://developers.google.com/search/docs/fundamentals/seo-starter-guide
---

# SEO Audit

## Setup
Use this when auditing or diagnosing SEO issues.

## Core Patterns

### Confirm scope and goals
Clarify whether the audit is site-wide or page-specific and what outcomes matter.

### Crawl and index basics
Verify robots.txt, sitemaps, canonical tags, and noindex usage.

### On-page essentials
Review title/H1, meta descriptions, internal links, and thin/duplicate pages.

### Performance signals
Assess Core Web Vitals and mobile usability.

### Prioritize with evidence
Provide a ranked list of issues with impact and supporting evidence.

## Common Mistakes

### Claiming ranking outcomes
Wrong
```text
"This change will increase rankings by 20%."
```
Correct
```text
"This should improve indexability; rankings depend on many factors."
```
Explanation: SEO impact is probabilistic and should not be overstated.

### Skipping evidence
Wrong
```text
"The site is slow" (no metric or source).
```
Correct
```text
"LCP is 4.2s on mobile (PageSpeed Insights)."
```
Explanation: Evidence makes recommendations credible and actionable.
