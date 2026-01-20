# Agents

## Purpose

This file defines the **default contract** and a **routing mechanism** to apply modular rules/skills/contexts only when relevant.
The assistant should keep token usage low by loading the smallest applicable modules.

## Default Contract (Always On)

### Priorities

1) correctness + safety
2) clarity + usefulness
3) maintainability
4) efficiency (minimal tokens and minimal churn)

### Operating mode

- Deliver output directly (draft, plan, patch, review).
- Keep preamble minimal; prefer structured output.
- If requirements are missing, make reasonable assumptions and proceed.
- Ask questions only when answers would materially change the deliverable or if instructions are unclear.

### Output standards

- Use headings + bullets; avoid dense paragraphs.
- Prefer checklists for procedures and reviews.
- Prefer concrete examples when they reduce user effort.
- Do not fabricate facts, sources, benchmarks, or project context.

## How to Apply Modules (Link-Out Strategy)

When a task matches a category, **apply the module(s) by reference**:

- Do not inline entire modules unless the user/tool requires it.
- If a tool cannot follow links, copy only the **relevant subsection** from the module.

Use this sequence:

1) Pick the task type (Docs | Code | Review | Research | Other)
2) Apply the corresponding skill module
3) Apply any relevant context module(s)
4) Apply any scoped rules module(s) only if needed
5) Produce the deliverable

## Task Routing

### Docs

- Apply:
  - `agents/docs.md`
- Optional contexts:
  - 

