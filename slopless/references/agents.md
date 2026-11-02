# Agents mode (opt-in)

Default is one agent: you. Agents mode costs more tokens and coordination; it only pays off on big jobs. Offer it once when the job is large (≈12+ slides, 6+ sections, several surfaces or platforms), in one line, and let the user choose how many helpers (1–4). Never start it unasked. If the harness cannot spawn agents, write the role prompts as handoff files the user can paste elsewhere.

## Roles

| Role | Does | Writes code? | Model tier |
| --- | --- | --- | --- |
| **Lead** (you) | Interview, direction, tokens, shared core, the opening/hero, merging, final call | yes | your current model |
| **Builder** | Builds an assigned slice (slides 6–12, sections 3–5, one screen) on the shared core | yes, own files only | mid (e.g. Sonnet-class) |
| **Motion** | GSAP timelines, Three.js objects, shaders for named beats | yes, own files only | mid; top only for the signature move |
| **Visual QA** | Runs `shoot.mjs`, looks at every image, reports defects with screenshot paths | no | fast (e.g. Haiku-class) |
| **Reviewer** | Runs `slop-scan.mjs`, critiques with `review.md`, content audit against the source, verdict | no | mid, higher effort |
| **Researcher** | Studies reference sites/techniques, returns decisions not essays | no | fast |

Pick the cheapest model the harness offers that can do the role well; escalate only when a role fails twice. Mechanical work (screenshots, scans, slicing slides on a defined system) never needs the top tier.

How many helpers:
- **1** → Reviewer (best value: an independent eye).
- **2** → Builder + Reviewer.
- **3** → Builder + Motion + Reviewer (Visual QA folded into Reviewer).
- **4** → 2 Builders + Motion + Reviewer/QA.

## Flow
1. Lead finishes interview, direction, tokens and shared core, and builds one reference slice that sets the bar. Nothing parallel starts before the core exists, or builders will invent their own systems.
2. Lead writes one brief per helper (template below) and launches them in parallel, each in its own files (or worktree).
3. Builders return file lists and screenshots. Lead merges.
4. Visual QA + Reviewer run on the merged result.
5. Lead fixes in one batch. At most two review rounds.

## Helper brief template
```
Role: <Builder | Motion | Visual QA | Reviewer | Researcher> for <project>.
Read first: .slopless/DESIGN.md, <brief path>, <tokens/core files>, slopless references: <only the ones this role needs>.
Scope: <exact slides/sections/files>. Do not touch anything else.
Must not change: <content authority + facts>.
Rules: no new dependencies, no git, no spawning agents, no publishing. Use tokens only.
Done means: <files>, screenshots at <sizes> in <dir>, slop-scan clean on your files.
Return: changed files, screenshot paths, anything unverified. Under 200 words.
```

Reviewer and Visual QA get the brief, the source of truth and the output path, and are told: read-only, verdict + top problems with locations, no rewrites.
