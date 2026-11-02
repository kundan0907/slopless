---
name: slopless
description: Design and build anything visual so it looks decided, premium and human, never AI-made. Covers presentations and demo decks, landing pages and portfolios, mobile and app screens (iOS, Android, React Native), and graphics (social posts, posters, brand boards). Interviews for the story and taste, deals a direction and a curated palette, builds with GSAP / Three.js / WebGL motion when wanted, verifies in a real browser, scans for slop, and learns the user's taste across sessions. Optional agents mode for big jobs. Use when someone asks to design, build, redesign, review or polish any UI, deck, site or graphic, or says it looks generic, cheap, templated or "AI".
---

# slopless

AI output looks cheap because it is the average of everything: centred hero, eyebrow label, three icon cards, purple gradient, emoji bullets, slogan headlines, motion that decorates. slopless replaces every default with a decision, checks the result with eyes and a scanner, and remembers what this user likes.

Load only what the current step needs. Each reference below is small and single-purpose.

## 0. Start every run

1. Read the taste memory if it exists: `~/.slopless/taste.md` (this user, all projects) and `.slopless/DESIGN.md` (this project). Their decisions beat this skill's defaults. Format: `references/memory.md` (load only when writing to memory).
2. Classify the job and load its surface file:

| Job | Load |
| --- | --- |
| Talk, demo deck, keynote, interactive explainer | `references/surfaces/deck.md` |
| Landing page, product page, portfolio, one-pager | `references/surfaces/web.md` |
| App screen, mobile, iOS / Android / React Native, dashboard | `references/surfaces/app.md` |
| Social post, poster, slide image, brand board, thumbnail | `references/surfaces/graphic.md` |
| Review, audit, "why does this look AI", polish an existing thing | `references/review.md` |

3. Size it. Small (one component, one screen, one fix): skip to step 4 of the loop with a one-line reading of the brief. Large (a whole deck, site, app flow): run the full loop. If it is very large (≈12+ slides, 6+ sections, several surfaces), offer agents mode once (`references/agents.md`). Never start it unasked.

## The loop

1. **Interview** — `references/interview.md`. Story first, then taste. At most four questions per round, with options and a recommended default. Skip what memory or the brief already answers. Play back a five-line summary and get a yes.
2. **Direction** — `references/direction.md`. Inventory the subject, find the idea, pick a colour strategy and a palette (`references/palettes.md`), type (`references/type.md`), composition (`references/layout.md`), motion level (`references/motion.md`). Write the brief (`references/brief.md`) and save durable decisions to `.slopless/DESIGN.md`.
3. **Prove** — for large or new-world work, build two small live studies that differ in material and choreography, on real content. Screenshot them. The user picks. Never run a full build on an unapproved direction.
4. **Build** — tokens first, then the hero/opening, then each part. Read `references/craft-floor.md` right before editing UI. Write copy with `references/copy.md`. Still first, motion second.
5. **Verify** — `node <skill>/scripts/slop-scan.mjs <files>` then `node <skill>/scripts/shoot.mjs <file-or-url>`; open the screenshots and critique them with `references/review.md`. Fix everything in one batch, re-check once, stop. Report what was checked in a real browser and what is unproven.
6. **Learn** — when the user corrects taste ("fonts feel cheap", "too busy", "I love this glass"), add one dated line to `~/.slopless/taste.md` right away. Project-specific decisions go in `.slopless/DESIGN.md`.

## The floor (always)

- The brief and the user's memory win over this skill's taste. A chosen material (glass, neon, serif) is allowed when chosen; never by default.
- A design pass never rewrites the story or facts. Copy changes are a separate pass with sources.
- One accent. Two type families at most. Tone steps instead of borders. Shadows only on things that float.
- No emoji as icons, no gradient text, no violet-blue gradients, no eyebrow labels, no rows of identical icon cards, no glow halos, no fake metrics, no count-up numbers.
- Motion explains cause and effect or carries the story; it never decorates. Reduced motion lands every state.
- Real objects look real: devices, hardware, interfaces built from real dimensions and real screenshots.
- Deliverables are complete and self-contained; earlier versions are never overwritten.
- Full registry of tells: `references/tells.md`.

## Files

| File | Load when |
| --- | --- |
| `references/interview.md` | Step 1 |
| `references/direction.md` · `palettes.md` · `type.md` · `layout.md` | Step 2 |
| `references/motion.md` | Choosing or building motion, 3D, WebGL |
| `references/brief.md` | Writing the brief or a handoff |
| `references/craft-floor.md` · `copy.md` | Step 4 |
| `references/review.md` · `tells.md` | Step 5, or any review |
| `references/memory.md` | Writing taste memory |
| `references/agents.md` | User opts into agents mode |
| `references/inspiration.md` | User wants references, or you need to research a technique |
| `scripts/slop-scan.mjs` | Static scan of HTML/CSS/JS/JSX/TSX/MD for tells (Node 18+) |
| `scripts/shoot.mjs` | Screenshots at 1440, 768, 390 (and 1920 for decks) with Playwright |
