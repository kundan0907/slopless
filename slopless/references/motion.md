# Motion, 3D and WebGL

Build still first. A thing that needs animation to look finished is not finished. Then add one authored moment, not scattered effects.

## Levels
- **Still** — hover/press/focus feedback only.
- **Subtle** — entrances once per section (heading → text → picture, 60–90ms stagger, 16–32px rise with opacity), gentle parallax, smooth wheel scroll (Lenis, not on touch).
- **Cinematic** — scenes connect: the same object carries over; scrubbed and pinned timelines; camera-like moves (dolly, rack focus) in CSS 3D.
- **Spatial** — real 3D objects (Three.js), shader backgrounds (sky, matte hex, liquid glass, light fields), depth and lighting that respond to angle.

## Connected storytelling (the signature)
Keep the hero object alive between beats. A ticket leaves the queue, is claimed by a machine, becomes a PR, lands on a phone. A message leaves the editor as a card and flies past Publish → Sync → Deliver into the device. A device stays on stage and turns toward each point. Never replace a handoff with an unrelated fade.

## Curves and timing
- Default out `cubic-bezier(0.22,1,0.36,1)`; strong arrival `cubic-bezier(0.16,1,0.3,1)`; scene moves `cubic-bezier(0.7,0,0.2,1)` or GSAP `power3.inOut`.
- Feedback 120–200ms · entrances 400–700ms · handoffs 900–1600ms. Never one duration for everything.
- Springs for drag, sheets, dock magnification. Magnification falls off smoothly to neighbours; nothing escapes its container.
- No bounce easing, no infinite loops that mean nothing, no fade-up on every block, no hover-lift on every card.

## Timelines
- Connected cinematic decks and pinned stories: one GSAP master timeline with a label per beat; every visual derives from timeline position so reverse, scrub and jump land correctly. Preserve working existing controllers. Basic decks can use the dependency-free controller in `assets/deck-controller.js`; do not add GSAP for a fade. Cancel stale animations before applying a new state.
- Sites: ScrollTrigger for pinned scenes and scrubs; `gsap.matchMedia()` for breakpoints and `prefers-reduced-motion`.
- Elements are visible by default; motion enhances. Content never stays hidden if a script fails.

## 3D and shaders
- Three.js for objects: build devices from real dimensions (mm → px scale) so they read as the real thing. `MeshPhysicalMaterial` with `transmission`, `roughness`, `ior`, `thickness` for glass; an environment map (RoomEnvironment) for believable reflections.
- Backgrounds are materials that respond (sky, matte hex, ripple on press), not looping videos or gradient blobs. The cursor never moves what the reader is reading.
- Budget: start after `load` + idle; cap DPR at 1.5; pause in hidden tabs and offscreen; halve work if frames run slow; static CSS fallback without WebGL.
- Libraries to check before writing shaders: Canvas UI (canvasui.dev, MIT + Commons Clause), Three.js, OGL. State what you adopted versus built.

## Glass that looks expensive (when glass is the chosen material)
- Few surfaces. Dense evidence (tables, charts, screenshots) sits on opaque panels.
- 1px light rim + inner top highlight; at most a faint holographic tint. No outer glow.
- Never animate blur radius; fade a pre-blurred layer. Drop blur at rest if it softens live text.
- `@supports not (backdrop-filter: blur(1px))` → solid tinted panel.

## Performance
Hot path animates `transform` and `opacity`; `clip-path`, `filter` and `backdrop-filter` only when profiled smooth. Loops run only while visible (IntersectionObserver). Measure frame timing on the target hardware before claiming smoothness; do not invent a percentile or universal frame budget.

## Reduced motion
`prefers-reduced-motion: reduce` → each state lands with a ≤150ms fade; no travel, no parallax, no 3D camera moves; one still frame for backgrounds.

## Go deeper (if installed)
`gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `animate`, `apple-design`, `emil-design-eng`, `animation-performance`.
