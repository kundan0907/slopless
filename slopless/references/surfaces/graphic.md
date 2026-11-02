# Surface: graphics (social, posters, covers, slide images, brand boards)

## Shape
- One message, readable in under two seconds at thumbnail size. Squint test at 25% scale.
- Sizes: 1080×1350 (feed portrait), 1080×1920 (story), 1200×630 (link preview), 1920×1080 (slide), 3000×2000 (cover). Keep text in the safe area (≈ 6–8% margins; stories avoid top/bottom 14%).
- Composition: a dominant object or a dominant word, never both competing. Drenched or committed colour strategies work best here.
- Type does most of the work: one family, two sizes, tight display tracking, headline ≤ 6 words.

## Build
Make graphics in HTML/CSS (or SVG) at exact pixel size, then export with `shoot.mjs --size WxH --full false` or the browser. This keeps type crisp, colours exact and edits cheap. For a series, one template with data swapped per card, so the set is consistent.

## Brand boards
Logo on ground and on accent, palette with roles and hex, type specimen at real sizes, two or three applications (slide, post, app icon), clear-space and misuse examples. If image generation is available and the user wants mockups, generate scenes but keep logo and type composited from the real files.

## Verify
View at 100% and at thumbnail size; check contrast; check that nothing important sits in a platform's crop or UI overlay.
