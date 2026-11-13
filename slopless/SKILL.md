---
name: slopless
description: Improve an existing UI or HTML deck, or design a new website, app screen, presentation or graphic. Use for visual hierarchy, distinctive composition, storytelling, interaction polish and removing generic generated-design patterns. Quick mode produces a focused V2; deeper design and review modes are available.
---

# slopless

Make the subject clear, distinctive and useful. Preserve the user's facts, intent and chosen identity. More effects and more process do not mean better design.

**Every route follows the same execution contract:** Audit → Direction (approved) → Spacing → Color → Icons → Copy → Type → Layout → Details → Visuals → Motion → Checklist → Report. Read `references/run-contract.md` before acting; it defines evidence, preservation, approval and completion. `references/reel-learnings.md` holds the source map and the launch, motion and taste learnings; load its relevant section at the linked pass. These additions govern ordering, timing and release gates where older route/reference guidance is broader. Existing routes still set scope and effort.

unslop was created by Damir Sokolovsky (@heydamir), CC BY 4.0. The nine-pass and preservation additions adapt that work; source revisions and notices are in `references/reel-learnings.md`.

## Understand first; put function and UI/UX first

Before building, understand the supplied content, audience, task, existing design language and intended viewing conditions. Use Linear and Apple Notes as references for clear hierarchy and purposeful interaction, not as a compulsory minimal aesthetic. The main task should be evident from layout and real content.

Cut generic or redundant taglines, helper text and secondary labels when copy editing is authorized. Add supporting text or secondary tables only when they improve understanding, action, accessibility or real evidence. If explanation is compensating for a weak layout, fix hierarchy, grouping and controls first. Preserve necessary form labels, errors, accessible names, evidence caveats and locked copy.

Prefer decisions that improve UX, DX and AX together: a clearer task for the user, coherent implementation for the developer, and clear tokens, ownership and source authority for the next agent. Reuse the existing design system and verify affected behavior. Choose implementation complexity for the experience it enables, not an arbitrary demand for fewer elements or dependencies.

Expressive design remains welcome: 3D, glass, cinematic motion and an extravagant showcase can be the right direction. Keep the user's chosen expression while protecting readability, interaction, accessibility and performance. Do not flatten an expressive design or remove a liked effect merely to call it clean.

## Own the design on every task

Act as the design owner, even for a short prompt. Before editing, privately identify the user's outcome, the current visual weakness, the intended improvement and the constraints. Choose hierarchy, grouping, composition, type, material and motion for a reason. A small request still deserves contextual judgment and finished details; keep its scope small unless a wider change is authorized.

The design owner sets the direction and judges the rendered result; the developer implements that intent and preserves behavior. One agent can perform both roles without orchestration overhead. When helpers are explicitly authorized, give the builder the visual intent, constraints and acceptance views; the owner reviews the result before delivery. Do not silently substitute a palette, material or composition during implementation.

## Choose the route first

Read relevant existing source and any taste memory (`~/.slopless/taste.md`, project `.slopless/DESIGN.md`) once. Missing memory is normal. Current instructions win; do not treat earlier agent choices as user preferences.

| Route | Trigger | Read next |
| --- | --- | --- |
| **Quick** | Existing work: improve, polish, restyle, V2, fast; default for refinements | `references/quick.md` |
| **Standard** | New work or an explicit redesign/rebuild | `references/interview.md`, then the surface below and the design loop |
| **Deep** | Explicit exploration, complex story, cinematic/spatial work, or detailed audit | Standard plus only the relevant specialist references |
| **Review** | Critique/audit without a request to edit | `references/review.md`; report findings, do not change files |

Quick must make a visible, useful difference within the requested scope. Spend less time on setup, alternatives and repetition while retaining deliberate design and visual verification. If a Quick request has no existing artifact, make the smallest new result using Standard.

First apply the Audit preservation gate in `references/run-contract.md`: no confirmed defect means preserve, not manufacture a different V2. Quick compresses the evidence record; Review applies the ordered passes read-only. Neither route skips the contract.

Open with one short line that sets the tone: the route and what happens next ("Standard: a few quick choices first, then I build and show you the result."). Standard and Deep always interview the user with A–D options and a recommended pick before building (`references/interview.md`), unless the user said quick, said "you pick", or the brief already answers every question. Quick and Review never interview; they ask only about a consequential missing decision.

## Design loop (Standard and Deep)

Direction uses the taste-calibration and approval record in `references/run-contract.md#direction-approved`. The Build step executes its nine passes in order. Pass 8 reads `references/reel-learnings.md#reel-1-stageshow` for faux product UI or launch visuals; pass 9 checks all 20 principles through `references/motion.md#motion-contract`. Verification ends with the contract checklist and scored gate; missing rendering means `recapture`, never visually done.

1. **Interview.** Read the brief and source, then run `references/interview.md`: tailored A–D options with a recommended pick for narrative, motion, reference feel (`references/sites.md`), brand/palette, copy authority and constraints. Skip what is already answered. End with the playback.
2. **Decide.** Load `references/direction.md` and `references/storytelling.md`. Choose the idea, hierarchy and material before effects. Consult `palettes.md`, `type.md`, `layout.md` or `motion.md` only for decisions still open. A user's exact palette beats a suggested mood. Record project decisions in `.slopless/DESIGN.md` when useful.
3. **Prove early.** For a new visual direction, render a small real-content study including the opening and the densest view before propagating it. Show two alternatives only when the user wants a choice or the direction is genuinely unresolved. Use existing authorization; do not add a confirmation round to an already specified direction.
4. **Build.** Read `references/craft-floor.md`. Reuse the existing stack, components, assets and working navigation. Before implementing a missing nontrivial UI component, follow `references/components.md` to find, adapt or learn from a suitable existing implementation. Build a convincing still composition first. Load `copy.md` only for authorized copywriting, `assets.md` only when new assets are needed. Do not reconstruct supplied content through model output.
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
- A design language coordinates colour roles, type, spacing, shape and interaction. Inherit it or derive it from the subject and viewing conditions; named palettes are starting points, not a compulsory look. The user controls direction, density and motion.
- Readable type and contrast, accessible controls, visible focus, responsive layouts, reduced motion and correct settled states are required. Use real assets or none; no fabricated proof.
- A banned-pattern scan cannot judge design quality. Never give an aesthetic score without looking at the rendered work.
- Visual edits need baseline, early-result and final-result inspection (`references/browser.md`). Compare the improvement at the same state and viewing size; a successful build or a smaller diff does not establish better UI.
- Keep complete deliverables self-contained when requested; retain the original and use a unique filename. Follow the user's artifact location rules.

## Keep runs cheap

Load only this route's references, not the library. Search then read relevant ranges; never dump embedded fonts, base64 or vendor bundles. Patch shared styles/components; do not rewrite unchanged content. Component sourcing (`references/components.md`) applies in every build mode when local reuse cannot meet the task; skip it for changes existing code already supports. Run scripts rather than read them unless debugging. Reuse browser sessions and cached assets. Quick has no mandatory external research tour, asset fetching, scoring essay or agents. Helpers require user opt-in (`references/agents.md`).

Finish every route with `references/report.md`: what was built or improved, the user's choices, every content change (before → after), checks and unverified limits. It doubles as the PR description. Never promise a fixed speed or token saving without a measured run. For reference feel use `references/sites.md`; for unfamiliar techniques or explicit research, `references/inspiration.md`. Do not browse for basic design decisions.
