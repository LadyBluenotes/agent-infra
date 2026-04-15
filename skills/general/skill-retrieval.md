---
name: skills/general/skill-retrieval
description: Mapping prompts to skills and recording retrieval rationale in the global agent-infra log.
type: sub-skill
category: general
---

# Skill Retrieval

## Setup
Use this when deciding which skill modules to load for a user prompt.

## Core Patterns

### Identify intent first
Classify the request (code, docs, review, debug, performance, research, seo) before loading skills.

### Match the smallest skill
Start with the most specific top-level skill, then load only the sub-skills needed.

### Prefer _meta routing
If `_meta/domain_map.yaml` exists for the category, use it as the routing source.

### Search triggers
Search skills for code changes, refactors, tests, debugging, docs, tutorials, references, explanations, reviews, PRs, issues, CI failures, TypeScript, JavaScript, React, Solid, Vitest, performance, accessibility, SEO, security, agent rules, skills, routing, prompt behavior, and repeated workflow patterns worth capturing.

### Record the mapping
Capture the repo id, prompt pattern, chosen skills, and rationale in `@notes/skill-retrieval.md`.

Use the path after `/GitHub/` as the repo id: `agent-infra`, `tanstack/tanstack.com`, `solid-docs`. If the repo is not under `/GitHub/`, use the shortest unique repo path available.

### Use the global log only
Always append skill retrieval entries to `@notes/skill-retrieval.md`, even when working in another repo.

Do not create or update repo-local `notes/skill-retrieval.md` files outside `@agent-infra/`. If one exists, read it only when useful and write new entries to the global log.

If the global log path is unavailable, state that logging was skipped. Do not fall back to a repo-local log.

Include repo id, prompt pattern, skills, rationale, outcome, success, signals, and redactions.

List task-relevant skills only. Omit routine process skills unless the request is about that process: `@skills/general/skill-retrieval.md`, `@skills/general/verification-before-completion.md`, `@skills/general/implement.md`.

If no log entry is needed, do not update the log. State the no-log rationale in the final response.

### Redact sensitive info
Strip tokens, credentials, emails, full URLs with query params, and user identifiers before logging.

### Track routing success
Mark `success` as `true` only with explicit user confirmation, `false` with explicit correction, otherwise `unknown`.

### Avoid overloading
Skip unrelated skills even if they are adjacent or familiar.

### Keep skill lists meaningful
Log the routing decision, not the routing mechanism. Routine process skills should not hide the domain skill choice.

### Avoid unnecessary log entries
Skip logging when the task creates no useful routing signal. Say why no entry was needed.

## Common Mistakes

### Loading too much
Wrong
```text
"Loaded every skill in a category to be safe."
```
Correct
```text
"Loaded only the top-level skill and one sub-skill needed for the task."
```
Explanation: Minimal loading reduces noise and keeps the response focused.

### Skipping the log
Wrong
```text
"Chose skills but did not record the prompt pattern."
```
Correct
```text
"Added a brief prompt-to-skill note for future retrieval."
```
Explanation: The log helps improve routing decisions over time.

### Writing to repo-local logs
Wrong
```text
"Appended skill retrieval notes to the current repo's notes/skill-retrieval.md."
```
Correct
```text
"Appended the entry to @notes/skill-retrieval.md with the current repo id recorded."
```
Explanation: Global routing history belongs in agent-infra, not each target repo.

### Logging raw sensitive data
Wrong
```text
"Customer email: jane@example.com"
```
Correct
```text
"Email redacted; used pattern: reset password flow"
```
Explanation: Logs should preserve routing signal without sensitive content.
