# Quick: a focused V2

Use for improving existing work without opening a new design project. The brief and existing artifact are the source of truth. Keep the design knowledge; reduce repeated work.

## Outcome, not cosmetic activity

A broad UI-improvement request needs an unmistakable, useful before/after difference: stronger hierarchy, clearer information relationships, a better composition, legible evidence or a more understandable interaction. Pick the strongest intervention in scope, including a focused layout change when needed. Colour, radius and font substitutions alone are insufficient when the real problem is structure. Do not equate a small patch with a successful design.

For a narrow request, apply the same judgment to that element and its context; do not impose an unrelated redesign. Define one observable improvement before editing and verify that it happened. A user should be able to see what became clearer without reading the implementation.

## Run

1. **Inspect once.** Read relevant source, existing design tokens and the views that need work. Render a baseline when possible (`browser.md`). For a deck, inspect the opening, densest evidence slide and one structurally different slide. For an app, inspect the main task and affected states. No default interview, palettes tour, new story outline or dependency search.
2. **Choose up to three material fixes.** Rank by user impact: comprehension and readability, hierarchy and grouping, composition, interaction, then decoration. Commit to a coherent visual improvement rather than a grab bag of polish. Keep a short internal checklist. Preserve the user's identity, copy, data, assets and working controller. A direct request for a different material or palette authorizes that change.
3. **Patch, then look early.** Change shared styles or the responsible components. Keep source content in place rather than retyping it. Inspect one representative rendering early. Shared token/style changes apply once; do not create local overrides just to stage their propagation. Load only the specific surface/type/layout/motion guidance needed for a real problem.
4. **Verify and finish.** Compare the baseline and V2 at the same state and viewport: is the intended improvement obvious, and is the result coherent? Scan changed code when available; visually check each distinct changed layout and every altered control/state. Decks also need a fast all-slide overflow/content sweep and a complete keyboard pass. Compare content per slide/section, preserving label–value–unit associations, caveats, notes, links and images. Fix concrete regressions in one batch, recheck affected views, and deliver a uniquely named V2. If the result is merely different, address the causing design decision before claiming an upgrade.

## Craft checklist (do not drop for speed)

- At a glance, the viewer knows what matters and where to go next.
- Reading text is comfortably legible at the actual viewing size; enlarged titles alone are not a redesign.
- Group by meaning. A lifecycle can become a connected flow; adoption can become a labelled comparison; a next step can become an action sequence. Keep all supplied words unless editing them was authorized.
- Neighbouring views have an appropriate rhythm; do not replace every surface with identical glass cards.
- Preserve semantic colour roles and check contrast. Dense evidence stays readable over decorative backgrounds.
- Controls remain usable, focus visible, backward/rapid navigation correct, and reduced motion complete.

## Keep verification proportional

For a CSS-only deck restyle, use one presentation size, visually inspect the representative changed layouts, and sweep all slides for content/layout regressions. Preserve text and script bytes where possible. Do not capture every beat at every width, generate a PDF, add a mobile layout, or rerun unchanged interaction suites. Check additional widths when the patch changes responsive behavior; exercise full beat semantics when it changes visibility, motion or navigation. Critical failures still need repair. Deliver after the bounded repair pass; keep optional polish out of the run.

## Boundaries

No new slide engine, framework, font download, autoplay, WebGL scene or extra presenter features unless requested or necessary to fix the reported problem. No automatic subagents. Do not refetch assets that already work offline. If a wider redesign is needed, ship the bounded improvement and name the remaining limitation; do not silently switch modes.

A quick check without editing is Review, not V2. A visually unverified result must be labelled as such. Never claim all slides or states were inspected when only samples were checked.
