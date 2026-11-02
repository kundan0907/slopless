# Surface: landing pages, product pages, portfolios

## Shape
- The first screen answers the visitor's first question in large type: what it is and what it does (product), who and what they do (person). One primary action as a real button.
- Sections follow the argument (claim → proof). Neighbours never share a layout. The idea reaches the footer; the footer is a designed close, often the name at full width.
- Navigation: wordmark, 3–5 plain links, one action. No floating blurred pill unless glass is the chosen material.
- Imagery: the project's own > generated > real pictures of the subject's world (open collections, credited; `scripts/assets.mjs photo`, `references/assets.md`) > drawn from the subject in code > type and colour alone. Never a fake product shot, never grey-bar dashboards. One dominant image beats six small ones.

## Portfolios
- Lead with the work's outcomes, not adjectives. Each project: what it is, your role, the result, the stack, in that order.
- One signature interaction that is about the person (their tool, their craft, their medium), not a generic 3D blob.
- Case studies: problem (the constraint), what you built (decisions), result (evidence). Hide sections you can't fill rather than shipping placeholders.

## Build
- Tokens as CSS custom properties; fluid type with `clamp()`; `gsap.matchMedia()` for motion and reduced motion; Lenis only on wheel.
- Performance: LCP image preloaded, fonts subset, WebGL deferred to idle, no layout shift.
- Phone layout is its own composition; check 390 first.

## Verify
`shoot.mjs` at 1440/768/390, full-page and first screen; Lighthouse if available; keyboard run; no-JS run shows all content.
