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

## Motion contract

Pass 9 applies every row below as `pass / fail / not applicable + evidence`. Read `reel-learnings.md#reel-2-motion` for the supplied demonstrations. A principle is a decision check, not a request to add an effect. Measure computed animation time, input-to-first-visible-response and actual playback at the intended viewport; a screenshot cannot prove timing.

**Precedence for new slopless runs:** every authored UI animation completes in **<300ms** (300ms fails); acknowledgment begins in **<400ms** (400ms fails). This includes entrances, exits, menus, spatial handoffs, stagger totals and spring settlement. The earlier 400–700ms entrance and 900–1600ms handoff bullets describe legacy cinematic pacing only; they are not permitted UI tween durations under this contract. A presentation story can last seconds through presenter holds and separate causal beats; controls respond immediately and each animated beat remains under the cap. Do not slice one long blocking transition into nominally short tweens. Existing working controllers are preserved unless their motion is within the requested change.

Authored spatial travel follows an arc, never a straight line. For example, key poses at `(0,0)`, `(12,-8)`, `(24,0)` define a bent route; use a quadratic/cubic path for a smooth arc. A constant-speed path is not an easing curve. Fade and scale have no positional path; an anchored scale need not travel. Direct pointer manipulation and native scrolling track the input without decorative detours. The earlier rise/parallax examples must use an arc when authored as travel. Reduced motion removes travel entirely. Keep text stable while its container changes state; do not distort readable text to satisfy a principle.

### Shared tokens

Borrow named roles from unslop-motion, reuse the project's compatible existing tokens, and define missing roles once. The source's 300/360/700ms and unbounded spring values are not imported: this contract is stricter.

| Role | Default and test |
| --- | --- |
| `press` / `fast` / `base` / `slow` | 120 / 160 / 200 / 280ms; all complete under 300ms |
| `curve` | `cubic-bezier(0.22,1,0.36,1)`; keep the existing equivalent when present |
| `move` | `cubic-bezier(0.7,0,0.2,1)`; easing for an arc, not its geometry |
| `stagger` | 30ms, at most four items with 200ms duration: `200 + 3*30 = 290ms`; larger collections appear together or use presenter-separated groups |
| `pressScale` | 0.97 only for occasional press feedback; frequent controls use state/color or no tween |
| Reduced motion | Settled state immediately or at most 150ms opacity; no spatial path, oscillation or camera move |

Springs are allowed only when measured settlement is under 300ms, with no repeated oscillation; otherwise use a bounded tween. Bounce/elastic loops remain disallowed. Squash, anticipation, follow-through and secondary action below are conditional, single-settle feedback, not permission for wobble. Progress that reflects real ongoing work can update for its actual duration; input acknowledgment still meets 400ms, and any authored transition between states meets 300ms. Never fake backend completion to meet a response threshold.

### Twenty checkable decisions

| Principle | Acceptance check (or explicit inapplicability reason) |
| --- | --- |
| 1. Squash and stretch | If an illustrated object needs weight, record neutral/impact/settled poses and preserve its apparent volume. Text and dense UI stay undistorted. No impact in the story means no squash is needed. |
| 2. Anticipation wind-up | A large unexpected action has a visible cue or restrained preparatory pose. Cue plus action stays under 300ms and never delays frequent input. Ordinary controls already signal their action. |
| 3. Staging the focus | At each beat, name one focal object; no unrelated object competes through simultaneous movement. Inspect frames at each focus handoff. |
| 4. Pose to pose | Record start, key and settled poses with timestamps before implementation. All UI poses fit below 300ms; the reel's 0/250/500ms demonstration is explanatory, not a timing preset. |
| 5. Follow through | If parts settle after the main object, the last part still settles under 300ms. Inspect the tail; cancellation and reverse navigation reach the latest requested state. |
| 6. Slow in and slow out | Authored arrivals use a named non-linear ease; inspect acceleration/deceleration at key frames. Frequent feedback may favor immediate ease-out. Real progress and direct input can remain linear. |
| 7. Moving in arcs | Inspect intermediate x/y positions or the actual path: authored spatial travel has a curved trajectory, not a straight segment. Ease changes speed, not trajectory. Fades/scales: no travel, not applicable. |
| 8. Secondary action | Any flourish explains the same result as the main action, shares its focus and finishes under 300ms. A saved state needs visible confirmation even when flourish is absent. |
| 9. Snappy timing | Measure every tween, spring tail and stagger group: each is strictly under 300ms. Check rapid repeat, cancellation, background/resume and reduced motion. |
| 10. Exaggerated feedback | Error/result is distinguishable without motion or color alone; inspect its text/icon/focus at rest. Add restrained emphasis only when needed; no screen shake, flashing or repeated bounce. |
| 11. Solid drawing in 3D | Where depth is used, occlusion, light direction and perspective agree across frames; no clipped layers or illegible glass. Flat functional UI can explicitly remain flat. |
| 12. Overall appeal | Replace the word “appeal” with results of hierarchy, composition, reading, interaction/story and identity/fit in the scored gate. Each needs rendered evidence, not a taste adjective. |
| 13. Fitts's law | Measure primary and close-control target bounds and placement. Web target minimum 24×24 CSS px; touch minimum 44×44. Frequent action is reachable without crossing unrelated controls. |
| 14. Bigger hit areas | Small visible glyphs have larger non-overlapping hit boxes; measure both boxes. Enlarging hit areas preserves adjacent controls and focus geometry. |
| 15. Hick's law | Identify one primary next action per decision group. Group existing secondary choices by task; record any count reduction only when content editing was authorized. Never hide required options solely to meet a count. |
| 16. Miller's law | Group information by meaningful task or story beat and name the groups. “About seven” is a memory heuristic, not a universal menu/item cap or permission to delete evidence. |
| 17. Doherty threshold | Measure input to visible acknowledgment: strictly under 400ms; show pending state for real waits. Data work can take longer, with a truthful cancel/retry path when applicable. |
| 18. Postel's law | At authorized input boundaries, test expected harmless whitespace/case variations and clean display formatting. Reject malformed or unsafe input explicitly; never loosen security validation for convenience. |
| 19. Jakob's law | Compare affected navigation, focus, shortcuts and dismiss behavior with the existing platform/house components. Record the convention used; do not add a novel gesture or feature to be distinctive. |
| 20. Frequency of use | Classify each trigger: repeated typing/navigation has no spatial entrance replay; ordinary presses use brief state feedback; occasional story beats may use authored motion. Repeat the action and verify the classification. |

### Rehearsal evidence

For changed motion, inspect actual start, intermediate and settled frames, every action handoff and the loop seam if a loop exists. Check reverse/rapid navigation and reduced motion. A non-looping deck records “seam not applicable” and verifies presenter navigation instead. For launch visuals use `run-contract.md#pass-8-plan-the-launch-visual-before-code`; actual Stageshow gates and manual frame rehearsal are reported separately. If playback or frames cannot be inspected, record `recapture` and exactly which rules remain unverified.
