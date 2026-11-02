# Surface: decks, talks, interactive explainers

## Existing deck / Quick

Preserve its content, navigation, print output, notes, offline assets and intended slide order. Fix the responsible styles/components; do not rebuild its engine to change its look. Inspect the opening, densest slide and one different composition first. Follow `../quick.md`.

## Story and composition

- One claim per view, with its supporting evidence and caveats findable. Use `../storytelling.md` when changing the argument's visual form.
- Use a 1600×900 or 1920×1080 stage only when it suits the existing deck; scale consistently to fit. Check 1440×810 and the actual presentation size. Report rendered size, not only unscaled CSS values.
- Body 28–36px and captions at least 20px at a 1920 stage are starting points. Inspect actual density and viewing distance; do not shrink required text to satisfy a fixed slide count.
- A beat is a presenter-controlled point. Reveal only when it improves comprehension; keep labels, values and caveats together. Alternate statement, comparison, process and action views as the story needs. A travelling object is optional.

## New builds

Reuse a tested existing controller. For a small standalone deck, `assets/deck-controller.js` is a dependency-free controller to inline after the slide markup. Use `.slide` sections inside `[data-deck]`; add `data-b="1"`, `data-b="2"` only to content that needs a later beat. Unmarked content is always available. The controller owns visibility and transforms of marked elements, so place other animation on their children.

It provides ←/→, Space/PageUp/PageDown, Home/End, hash navigation, buttons with `data-deck-next` / `data-deck-prev`, and reduced motion. Click-to-advance is opt-in with `data-click-advance` on the deck. It sets `data-slopless-ready` and `data-slopless-beat` for capture. No GSAP, download or bundler is required. Keep base content visible if JavaScript fails. Supply a print stylesheet that removes stage transforms/overflow and places slides in normal flow with page breaks; the controller restores visibility, not your page geometry.

Add fullscreen, notes, blackout, overview, autoplay, swipe or scrubbing only when the brief calls for them. Connected cinematic choreography may justify one GSAP master timeline with labelled beats (`../motion.md`); basic fades do not.

## Verify

Every slide and content beat must be accounted for. Check overflow, chart associations, preserved source content, keyboard-only forward/back/jump navigation, rapid changes, reduced motion and print. For the provided controller use `shoot.mjs deck.html --deck --all --ready '[data-slopless-ready="true"]'`. Other engines use their own readiness or the disclosed timed fallback (`../browser.md`).

Quick uses a fast all-slide content/layout sweep plus visual checks of each distinct changed layout and affected state. Standard/Deep inspect every beat at rest at both deck sizes; inspect handoff frames when changing transitions. State any missing coverage. Screenshot count alone does not prove correctness.
