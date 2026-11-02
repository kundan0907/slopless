# Surface: decks, talks, interactive explainers

## Shape
- One idea per slide. 1600×900 or 1920×1080 stage scaled to fit; verify 1440×810.
- Beats, not slides: a beat is one point the presenter makes. If nothing changes between two beats, merge them. Fast sequences become several beats the presenter can talk over ("1 base → 3 → 9" is three beats).
- Rhythm: alternate statement slides, evidence slides (tables, charts, screenshots on opaque panels), and handoff moments where the hero object travels.
- A persistent stage object (phone, laptop, machine, ticket) carries the story across chapters.

## Controls (presenter owns the pace)
→ plays to the next beat at its designed speed and stops · ← plays back · two-finger scroll scrubs · number keys / URL hash jump · `N` presenter notes view · `P` autoplay · `B` blackout · `F` fullscreen. A quiet progress indicator. Rapid back/forward must land on correct states.

## Build
- Single self-contained HTML that works offline. Content lives in one data module; scenes read from it.
- One GSAP master timeline with a label per beat; every visual derives from timeline position (see `motion.md`).
- Live demos embedded with a fallback screenshot if the network is down.
- Speaker script alongside: Say / Click / If asked, with sources.

## Verify
Every beat at rest + mid-handoff screenshots at 1920×1080 and 1440×810 (`shoot.mjs --deck --steps <beats>`); content audit against the source; reduced motion lands every beat; text crisp at rest (no leftover blur/skew); keyboard only run-through.

## Common failures
Too much text per slide; everything animating; the hero object looking like a placeholder; decorative bars; motion too fast to speak over; a redesign that silently edits facts.
