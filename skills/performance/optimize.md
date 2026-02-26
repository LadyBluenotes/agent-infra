---
name: skills/performance/optimize
description: Targeted performance improvements with before/after measurement.
type: sub-skill
category: performance
---

# Optimize Performance

## Setup
Use this when optimizing latency, throughput, or resource usage.

## Core Patterns

### Establish a baseline
Measure the current state with concrete metrics (latency, throughput, resource usage, Core Web Vitals).

### Identify bottlenecks
Use profiling, tracing, logs, or targeted benchmarks to find the highest impact bottleneck.

### Small, targeted changes
Apply minimal changes tied to a specific hypothesis and avoid broad refactors.

### Validate improvements
Re-measure after the change and compare before/after results.

### Guard against regressions
Add monitoring, alerts, or budgets to prevent the issue from returning.

## Common Mistakes

### Optimizing without data
Wrong
```text
"I sped it up without taking a baseline."
```
Correct
```text
"Baseline was 420ms p95; after the change it is 260ms p95."
```
Explanation: Without a baseline, you cannot prove the improvement or its size.

### Caching without invalidation
Wrong
```text
"I cached results, but there is no invalidation plan."
```
Correct
```text
"I added a TTL and invalidation on writes to keep data consistent."
```
Explanation: Cache invalidation is required to avoid serving stale data.

### Claiming wins without measurement
Wrong
```text
"This should be faster now."
```
Correct
```text
"Re-ran the benchmark; throughput improved by 18%."
```
Explanation: Performance claims need supporting measurements.
