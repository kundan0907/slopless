---
name: slopless
description: Improve an existing UI or HTML deck, or design a new website, app screen, presentation or graphic. Use for visual hierarchy, distinctive composition, storytelling, interaction polish and removing generic generated-design patterns. Quick mode produces a focused V2; deeper design and review modes are available.
---

# slopless

Make the subject clear, distinctive and useful. Preserve the user's facts, intent and chosen identity. More effects and more process do not mean better design.

## Choose the route first

Read relevant existing source and any taste memory (`~/.slopless/taste.md`, project `.slopless/DESIGN.md`) once. Missing memory is normal. Current instructions win; do not treat earlier agent choices as user preferences.

| Route | Trigger | Read next |
| --- | --- | --- |
| **Quick** | Existing work: improve, polish, restyle, V2, fast; default for refinements | `references/quick.md` |
| **Standard** | New work or an explicit redesign/rebuild | The surface below; follow the design loop |
| **Deep** | Explicit exploration, complex story, cinematic/spatial work, or detailed audit | Standard plus only the relevant specialist references |
| **Review** | Critique/audit without a request to edit | `references/review.md`; report findings, do not change files |

Quick keeps the same craft floor and a smaller scope. If a Quick request has no existing artifact, make the smallest new result using Standard. Say the selected route in one short line. Ask only about a consequential missing decision; a complete brief needs no interview.

## Design loop (Standard and Deep)

1. **Understand.** Infer answered requirements from the brief and source. For unknown story/taste decisions, use `references/interview.md`. State assumptions as your choices. An existing design does not need a new questionnaire.
2. **Decide.** Load `references/direction.md` and `references/storytelling.md`. Choose the idea, hierarchy and material before effects. Consult `palettes.md`, `type.md`, `layout.md` or `motion.md` only for decisions still open. A user's exact palette beats a suggested mood. Record project decisions in `.slopless/DESIGN.md` when useful.
3. **Prove early.** For a new visual direction, render a small real-content study including the opening and the densest view before propagating it. Show two alternatives only when the user wants a choice or the direction is genuinely unresolved. Use existing authorization; do not add a confirmation round to an already specified direction.
4. **Build.** Read `references/craft-floor.md`. Reuse the existing stack, components, assets and working navigation. Build a convincing still composition first. Load `copy.md` only for authorized copywriting, `assets.md` only when new assets are needed. Do not reconstruct supplied content through model output.
5. **Verify.** Follow `references/browser.md` and the surface checks. Scan changed files if Node is available, inspect rendered results, test affected behavior and source preservation. Use `references/visual-quality.md` for the visual critique. Fix once as a batch and recheck affected views; expand only for a remaining concrete failure.
6. **Learn.** Save explicit user corrections with `references/memory.md`. Do not persist an inferred preference as something the user approved.

## Surface (load one when its rules matter)

- Deck/talk: `references/surfaces/deck.md`.
- Website: `references/surfaces/web.md`.
- App/dashboard: `references/surfaces/app.md`.
- Graphic/poster: `references/surfaces/graphic.md`.

## Craft that survives every mode

- Preserve text, numbers, units, associations, caveats, links, images, notes and behavior unless their change is authorized.
- One dominant idea per view; composition follows the information. Cards group related objects, not every paragraph. Semantic data colours may need more than one accent.
- Readable type and contrast, accessible controls, visible focus, responsive layouts, reduced motion and correct settled states are required. Use real assets or none; no fabricated proof.
- A banned-pattern scan cannot judge design quality. Never give an aesthetic score without looking at the rendered work.
- Keep complete deliverables self-contained when requested; retain the original and use a unique filename. Follow the user's artifact location rules.

## Keep runs cheap

Load only this route's references, not the library. Search then read relevant ranges; never dump embedded fonts, base64 or vendor bundles. Patch shared styles/components; do not rewrite unchanged content. Run scripts rather than read them unless debugging. Reuse browser sessions and cached assets. Quick has no mandatory external research, asset fetching, scoring essay or agents. Helpers require user opt-in (`references/agents.md`).

Report the deliverable, the material improvements, checks performed and any unverified limits. Never promise a fixed speed or token saving without a measured run. For unfamiliar techniques or explicit research, use `references/inspiration.md`; do not browse for basic design decisions.
