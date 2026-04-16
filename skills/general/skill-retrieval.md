---
name: skills/general/skill-retrieval
description: >
  Skill routing guidance for matching prompts to task-relevant domain skills,
  logging canonical `@skills/...` IDs, and omitting routine process skills.
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
Capture the repo id, prompt pattern, chosen skills, and rationale in `@notes/skill-retrieval.md` by default when task-relevant skills are loaded.

Use the path after `/GitHub/` as the repo id: `agent-infra`, `tanstack/tanstack.com`, `solid-docs`. If the repo is not under `/GitHub/`, use the shortest unique repo path available.

### Use the private notes log only
Always append skill retrieval entries to `@notes/skill-retrieval.md`, even when working in another repo.

Do not create or update repo-local `notes/skill-retrieval.md` files outside the private `@notes/` root. If one exists elsewhere, read it only when useful and write new entries to the private log.

If the private log path is unavailable, state that logging was skipped. Do not fall back to a repo-local log.

Include repo id, prompt pattern, skills, rationale, outcome, success, signals, and redactions.

List task-relevant domain skills and skills that are the subject of the request.
Omit routine process skills that are loaded because standing instructions require them:
`@skills/general/skill-retrieval`, `@skills/general/verification-before-completion`,
`@skills/general/implement`, and `@skills/general/process-hygiene`.
Do not log the retrieval skill merely because it was used to decide routing.

If no log entry is needed because only common process skills were used and no reusable routing signal exists, do not update the log. State the no-log rationale in the final response.

### Use canonical skill ids in logs
Write local skill ids without the `.md` suffix and with the leading `@skills/` alias.
Normalize bare local ids such as `skills/docs/reference` to `@skills/docs/reference`.

```text
@skills/tooling/vitest/testing-patterns
@skills/docs/reference-editing
@skills/frameworks/react/hydration
```

Plugin skills keep their plugin prefix, such as `github:github`. Meta skills keep their
`@meta/...` alias. If a useful skill is repo-local, missing, or not installed globally,
record the exact observed id and note the gap in the outcome.

### Inventory repeated signals
Review `@notes/skill-retrieval.md` monthly or after about 10 new logged prompts, whichever comes first.

Look for:
- repeated prompts routed to broad skills
- inconsistent ids for the same skill
- repo-local skills that should become global skills
- repeated source-backed workflows that deserve refs
- explicit user corrections to routing

Record accepted updates in the relevant work-log before implementation.

### Redact sensitive info
Strip tokens, credentials, emails, full URLs with query params, and user identifiers before logging.

### Track routing success
Mark `success` as `true` only with explicit user confirmation, `false` with explicit correction, otherwise `unknown`.

### Avoid overloading
Skip unrelated skills even if they are adjacent or familiar.

### Keep skill lists meaningful
Log the task-relevant skill choice, not the routing mechanism. Routine process
skills should not hide the domain skill choice or appear just because they are
required by standing instructions.

### Avoid unnecessary log entries
Skip logging only when the task creates no skill-use signal beyond common process skills. Say why no entry was needed.

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

### Logging non-canonical ids
Wrong
```text
"@skills/libraries/vitest.md, skills/docs/solid-reference-editing"
```
Correct
```text
"@skills/tooling/vitest/testing-patterns, @skills/docs/reference-editing"
```
Explanation: Consistent ids make the log searchable and make repeated signals easier to inventory.

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
