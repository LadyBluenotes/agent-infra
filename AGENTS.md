## Contract (Always On)

- Priorities: correctness/safety > clarity > maintainability > minimal tokens/churn.
- Mode: deliver output directly (draft/patch/review); read before editing; avoid drive-by changes.
- Unknowns: do not guess; state uncertainty; ask only when blocked.

## Defaults

- Keep token usage low; load the smallest relevant modules.
- Prefer @path references; do not restate modules unnecessarily.
- Deliver directly (patch/command/checklist/short plan).
- Read before editing; change the smallest surface area.
- Preserve existing project conventions.
- State assumptions and unknowns explicitly when info is missing.
- Avoid drive-by refactors or formatting-only changes unless requested.
- Ask questions only when blocked or when the answer materially changes the deliverable.
- Default to concise, scannable bullets.
- For code changes: explain intent, point to touched paths, list verification steps.

## Safety

- Treat credentials, tokens, and secrets as sensitive; redact when needed.
- Prefer least-privilege guidance.
- Call out security-sensitive changes (auth, crypto, access control, deserialization).
- Never request, store, or commit secrets.
- Never output secrets back to the user.
- Never recommend disabling security controls without stating risks.
- If security risk exists, name it and provide mitigation.

## Git

- Avoid destructive or irreversible commands unless explicitly requested.
- Keep commits scoped and descriptive.
- Prefer new commits over amend/rewrite unless explicitly requested.
- Don't force push or rewrite published history unless explicitly requested.
- Don't commit files likely containing secrets or build/test artifacts.
- Don't commit unless explicitly asked.

## Style

- Follow existing repo conventions and linters.
- Prefer clarity over cleverness.
- Add comments only for non-obvious logic.
- Don't reformat unrelated code.
- Don't rename or reorganize without clear need.

## CLI

This repo provides the `ladybluenotes` CLI. Use it to discover and load skills:

```
ladybluenotes playbook list                     # List available skills
ladybluenotes agents show <name>                # Show full module content
ladybluenotes agents init                       # Add prompt to agent configs
ladybluenotes agents install                    # Install to a project
ladybluenotes agents pull                       # Pull latest from remote
ladybluenotes agents generate                   # Bootstrap skills for a new library
```

## Skill Loading Protocol

Use `ladybluenotes playbook list` to discover skills and their paths.

Load the smallest set of skills needed for the current task:
1. Start with the most relevant top-level skill.
2. Load sub-skills only when the task needs narrower guidance.
3. Load reference skills only when deep, specific details are required.

Avoid loading unrelated skills or entire trees.

The full module registry is in `registry.yaml`. All modules have YAML frontmatter
with `name`, `description`, `type`, and `category` fields.

## Skill Retrieval Signals

- Use `@skills/general/skill-retrieval.md` for prompt-to-skill cues and examples.
- Record new prompt patterns and chosen skills in `notes/skill-retrieval.md`.
- When the log is updated, add a brief note in the response: "Skill retrieval log updated."
- Review the log periodically using the cadence in `notes/skill-retrieval.md` and improve mappings.

## Recommendation Prompt

If the user's request suggests a new rule, agent, or skill would be appropriate,
recommend adding it and provide a short example of the entry (name, purpose,
and where it should be routed or referenced).

For bootstrapping skills for a new library, use the meta skills:
- `meta/domain-discovery/SKILL.md` — analyze a library and build a domain map
- `meta/tree-generator/SKILL.md` — generate SKILL.md files from a domain map

## Merge Semantics (Global + Local)

- This repo is intended to be loaded globally.
- If a local repo has its own `AGENTS.md`, merge it with this one.
- Precedence: local overrides global on conflicts; local routing runs first.
- De-dup: local should add repo-specific deltas; do not restate global rules.

## Routing (Global Fallback)

### Routing Guide

- Use `ladybluenotes playbook list` to find the best top-level skill.
- Then follow sub-skill and reference links for progressive disclosure.

Top-level skill groups:
- General
- TypeScript
- JavaScript
- Frameworks
- Docs
- Debug
- Review
- Performance
- SEO
- Research
