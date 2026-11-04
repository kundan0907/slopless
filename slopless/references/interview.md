# Interview

The interview is how the user steers. It runs at the start of every Standard and Deep job, including new builds and redesigns. Skip it only when the user says **quick**, says "you pick" / "just build it", or the brief already answers every question below. Ask only what is still open; never re-ask what the brief, source, `DESIGN.md` or taste memory answers.

## Read first, then ask

Before the first question, read the brief and any supplied source, URL, logo or screenshot. Write the options for *this* project: name its audience, product and content in the choices. Generic menus ("Modern / Minimal / Bold") are not an interview. Every recommendation needs a one-line reason grounded in what the user said.

## Format

- Up to four questions per round, three rounds at most, usually two.
- Each question: options **A–D**, exactly one marked **(Recommended)** and listed first, each with a one-line consequence. The user can always answer in their own words.
- Use the harness's structured question tool when it has one (Claude Code `AskUserQuestion`; put a code/visual sample in the option preview when it helps). Otherwise use this text form and accept replies like `1A 2C 3 "navy + gold"`:

```
1. How should the page move?
   A. Clean micro-interactions (Recommended) — hover, press and reveal feedback; fast and calm, fits a product page people revisit.
   B. Cinematic scroll story — pinned scenes; the product travels through each section.
   C. Spatial 3D — a real 3D object or shader stage; heaviest, most memorable.
   D. Still — no motion beyond focus and hover.
Reply with letters (e.g. 1A 2C), your own words, or "you pick".
```

"You pick" ends the interview: choose the recommended options and list them in the playback.

## Round 1 — the experience

Ask about whatever is open:

1. **Goal.** What is it and what should a visitor do or believe afterwards? Offer the 3–4 likeliest readings of the brief.
2. **Narrative.** A. Story-led: a hero object travels through before → change → after. B. Product-first: show the real product and proof immediately. C. Editorial: type and content lead, calm pacing. D. Playful/interactive: one thing the visitor can touch or play with.
3. **Motion** (levels in `motion.md`). A. Clean micro-interactions. B. Subtle entrances. C. Cinematic scroll story. D. Spatial 3D. Recommend from the narrative and where it runs.
4. **Reference feel.** Offer three entries from `sites.md` that fit the brief, each with what exactly to borrow ("Linear: dense dark precision", "Stripe Press: book-like editorial type"), plus D. "Show me a site you like". Learn the technique; never clone.

## Round 2 — the look

1. **Brand.** A. I have brand colours/logo/fonts (paste hex, files or guidelines). B. Derive from my existing site or logo (give the URL/file). C. No brand yet: pick a palette. D. You choose.
   - With brand hex: keep them exact, derive the remaining roles with `palettes.md` → Custom brand, and run the contrast check.
2. **Palette.** If not brand-locked, offer three `palettes.md` palettes that fit the mood and surface, by name with a one-line feel, plus D. "Something else" (they describe it).
3. **Theme and density.** Dark / light / both; airy or dense. Combine into one question with 4 concrete options.
4. **Type personality.** Only when it is open and matters: e.g. A. precise grotesk, B. editorial serif display, C. characterful display + quiet body, D. match the brand fonts.

## Round 3 — content and constraints (only what is still open)

1. **Copy authority.** A. Keep my words exactly. B. Tighten my copy; show every change. C. Write it for me from my notes (drafts flagged for review). D. Mixed: name the locked parts. Default recommendation: A for existing content, C for a blank page.
2. **Assets.** Real photos/screenshots/logos supplied, fetch licensed ones (`assets.md`), or use none.
3. **Stack and deliverable.** Existing repo/stack, single offline HTML, framework, or exported images. Where it runs (phone, projector, offline).
4. **Scope.** Sections/beats to include and anything that must not change.

## Playback, then build

Show the decisions in one block and offer two choices: **Build it (Recommended)** or **Change something**. A user who answered every question or said "you pick" needs no extra confirmation round.

```
Story:     After this, <audience> believes <claim> because <proof>.
Format:    <surface>, <sections/length>, runs on <where>, <stack>
Narrative: <A–D choice>   Motion: <level>   Reference feel: <site — what we borrow>
Look:      <palette or brand hex>, <theme>, <density>, <type>
Copy:      <keep | tighten (changes listed) | write (drafts flagged)>
Locked:    <must not change>
```

Save explicit taste answers that are new (see `memory.md`) and write the decisions to `.slopless/DESIGN.md` for the project. Never save your recommendation as their preference unless they chose it.
