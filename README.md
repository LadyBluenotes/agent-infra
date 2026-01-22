# agent-infra

This repo contains a modular instruction set for AI coding agents (currently based on [OpenCode](https://opencode.ai/)) that can be loaded globally and merged with per-project instructions.

The structure is designed to be:

- Minimal in token usage (small always-on set; everything else routed)
- Easy to extend (small files; clear ownership of concerns)
- Safe by default (explicit constraints and conservative defaults)

## How It Works

1) The agent starts at `AGENTS.md`.
2) `AGENTS.md` applies a small always-on set (contexts + rules).
3) `AGENTS.md` routes to the smallest applicable skill(s) and optional domain agent(s).
4) Domain agents (`agents/*`) provide heuristics (what to optimize for / avoid).
5) Skills (`skills/*`) provide task playbooks (process + output format), often via `index.md` routers.

## Merge Model (Global + Local)

When working inside another repo, OpenCode should merge:

- Global: this repo's `AGENTS.md`
- Local: the current repo's `AGENTS.md` (if present)

Merge semantics:

- Local overrides global on conflicts.
- Local routing runs first; global routing is the fallback.
- Local repos should add deltas only (repo facts + repo-specific rules), and avoid restating global defaults.

See `templates/AGENTS.local.template.md` for a minimal local starting point.

## Concepts

The repo is split into layers with strict boundaries.

### Directory Map

- `AGENTS.md`: global router + merge semantics
- `contexts/`: always-on defaults
- `rules/`: constraints
- `skills/`: task playbooks
- `agents/`: domain heuristics
- `templates/`: copy/paste starters for local repos

#### Agents (Domain Heuristics)

`agents/` contains domain- or language-specific heuristics.

- What to optimize for (typing strictness, async safety, compatibility)
- What to avoid (common footguns)
- Not a workflow (workflow lives in `skills/`)

#### Rules (Constraints)

`rules/` contains non-negotiable constraints that must be followed.

- Safety rails (secrets, unsafe commands, destructive git)
- "Never/Always" behavior
- Short, explicit, and testable

Module authoring conventions live in `rules/format.md`.

#### Contexts (Always-On Defaults)

`contexts/` contains stable defaults and facts.

- Personal/global defaults (output shape, interaction norms)
- Facts and conventions (when used locally)
- No process and no hard constraints (those live in `skills/` and `rules/`)

In this repo, `contexts/global.md` is intended to be always-on.

#### Skills (Task Playbooks)

Task playbooks live under `skills/` and are referenced via `@skills/...`.

- `skills/docs/`
- `skills/code/`
- `skills/review/`
- `skills/research/`
- `skills/debug/`
- `skills/seo/`

These files describe:

- What steps to follow for a task type
- What the expected output format looks like

They are meant to be linked to by `AGENTS.md` and referenced by `agents/*`.

### Compatibility

This repo standardizes on `@skills/...` references so playbook paths stay stable.

## Extension Guidelines (Keep It Token-Cheap)

- Prefer adding a new small module over expanding an always-on file.
- Use `index.md` as a small router; put details in submodules.
- Avoid duplication across layers.
- Prefer checklists and templates over prose.
- Reference other modules with `@path` instead of copying text.

## Notes

This repo is for my personal workflow and preferences.
