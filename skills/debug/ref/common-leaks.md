---
name: skills/debug/ref/common-leaks
description: >
  Common browser memory leak reference for uncleared event listeners, detached
  DOM nodes, unintentional globals, closures, and unbounded caches.
type: reference
category: debug
depth: reference
aliases:
  - common memory leaks
tags:
  - memory
  - leaks
  - browser
sources:
  - https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/skills/memory-leak-debugging/references/common-leaks.md
---

# Common Memory Leaks

## Uncleared event listeners

Event listeners attached to global objects or long-lived objects can keep
callback references alive. Remove listeners when the owner unmounts or the
listener is no longer needed.

## Detached DOM nodes

A DOM node removed from the document can remain alive when JavaScript still
references it. Detachedness is a signal, not proof: some apps intentionally
cache detached navigation trees.

Confirm with the user or source owner before nulling references that might be
intentional caches.

## Unintentional globals

Variables declared without `var`, `let`, or `const` in non-strict mode, or
values explicitly attached to `window`, can remain in memory indefinitely.

## Closures

Closures can keep references to large objects in outer scope. Release large
objects when no longer needed, or refactor the closure to avoid unnecessary
captures.

## Unbounded caches or arrays

Caches backed by objects, arrays, or maps can grow without limits. Add cache
limits, use LRU policies, or use `WeakMap`/`WeakSet` for object-lifecycle data.
