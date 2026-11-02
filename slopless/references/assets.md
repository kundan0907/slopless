# Assets: icons, fonts, images, devices, 3D, animation

Fetch real assets with `scripts/assets.mjs`. Never draw icons by hand, never use emoji or unicode glyphs as icons, never hotlink in a single-file deliverable: download, inline, credit where the licence asks.

## Rules

- One icon family per project, one stroke weight, one size grid (16, 20, 24). Outline vs filled means state, consistently.
- Inline SVG with `currentColor`, so icons follow the palette and pass contrast. Icon-only controls get an accessible name.
- Record the family, font and image sources with their licence in `.slopless/DESIGN.md`. Credit creators when the licence requires it (CC BY, CC BY-SA); put the credit in the footer or the notes.
- Check the licence of the specific file, not only the site. If it is unclear, skip it.
- Licences below were checked on each site's own licence page. Terms change; re-check for anything shipped to a client.

## Script

```
node <skill>/scripts/assets.mjs icon lucide:arrow-right --size 24 --stroke 1.5 [--out arrow.svg]
node <skill>/scripts/assets.mjs icons lucide arrow-right,check,x --out ./icons
node <skill>/scripts/assets.mjs search "arrow" --prefix lucide
node <skill>/scripts/assets.mjs font "Hanken Grotesk" --weights 400..700 --out ./fonts [--inline]
node <skill>/scripts/assets.mjs photo "night train"
```

`icon` and `icons` use the Iconify API and fall back to the same data on jsDelivr when the API is blocked. `font` downloads the latin WOFF2 from Google Fonts and prints an `@font-face` block (`--inline` embeds base64 for single-file work). Static-only families need a list, `--weights 400,700`. `photo` searches Openverse for CC0, public-domain, CC BY and CC BY-SA images and prints the credit line.

## Icons (all through Iconify prefixes)

| Family | Prefix | Licence | Good for |
| --- | --- | --- | --- |
| Lucide | `lucide` | ISC | Default UI set: clean 24px outline, consistent stroke, large coverage |
| Phosphor | `ph` | MIT | Six weights per icon; pick one weight, or use duotone for a warmer product |
| Tabler | `tabler` | MIT | Very large outline set; good for dashboards and unusual objects |
| Heroicons | `heroicons` | MIT | Outline and solid pairs; pairs with Tailwind-style UI |
| Material Symbols | `material-symbols` | Apache-2.0 | Android and Material apps; variable weight and fill |
| Iconoir | `iconoir` | MIT | Slightly more characterful outline set |
| Remix Icon | `ri` | Apache-2.0 | Neutral line and fill pairs, good business and media coverage |

Brand logos: use the `simple-icons` prefix (CC0 icons; the brand's own trademark rules still apply).

## Fonts

- **Google Fonts**: open-source licences (mostly SIL OFL), free for commercial use, self-hostable. Use `assets.mjs font`. Pick the family from `references/type.md` first.
- **Fontshare** (Indian Type Foundry): free for personal and commercial use under the ITF Free Font License; download the files from the family page and read its licence before embedding.
- Subset to latin, load two families at most, `font-display: swap`, and embed WOFF2 as base64 for single files.

## Photos and imagery

- **Unsplash**: free for commercial and non-commercial use, no permission needed, credit appreciated. You may not resell unaltered images or compile them into a competing service. Download the file; do not hotlink the API URL.
- **Openverse** (openverse.org): search engine over openly licensed media. Each item has its own licence. Take CC0, public domain, CC BY, CC BY-SA; avoid NC and ND. Keep the creator and licence line from `assets.mjs photo`.
- **Wikimedia Commons**: per-file licences, many CC BY-SA (share-alike) and some public domain. Read the file page and copy its attribution text.
- Prefer the subject's own photographs, then real pictures of the subject's world, then these collections (see `surfaces/web.md` for the imagery order). Never stock people smiling at laptops.

## Device frames and mockups

Draw frames in CSS/SVG from real dimensions; do not use a flattened mockup PNG. Take exact artwork only from the manufacturer's resources: Apple Design Resources (developer.apple.com/design/resources) for iPhone, iPad and Mac, whose terms limit use to marketing of apps for Apple platforms; Google's Android and Pixel assets for Pixel.

| Device | Body (H x W x D) | Screen | Pixels |
| --- | --- | --- | --- |
| iPhone 16 | 147.6 x 71.6 x 7.8 mm | 6.1 in | 1179 x 2556 |
| iPhone 16 Pro | 149.6 x 71.5 x 8.25 mm | 6.3 in | 1206 x 2622 |
| iPhone 16 Pro Max | 163.0 x 77.6 x 8.25 mm | 6.9 in | 1320 x 2868 |
| Pixel 9 | 152.8 x 72.0 x 8.5 mm | 6.3 in | 1080 x 2424 |
| MacBook Air 13 in (M3) | 215 x 304.1 x 11.3 mm | 13.6 in | 2560 x 1664 |
| MacBook Pro 14 in (M4) | 221.2 x 312.6 x 15.5 mm | 14.2 in | 3024 x 1964 |

Dimensions come from the manufacturers' tech specs; confirm against the current page before relying on a millimetre.

CSS approach: set the frame's `aspect-ratio` from body width over height (`71.5 / 149.6`), express radius and bezel as a share of width with container units (`cqw`) so one frame scales everywhere, give the screen its own radius, add a dynamic island or notch only for the device named, and draw the screen content in the project's own UI. Show it at a believable size: a phone is about a third of a laptop's width.

## 3D, HDRI and textures

- **Poly Haven** (polyhaven.com): HDRIs, PBR textures and models, all CC0, no credit needed. Use a small HDRI (1k or 2k) for Three.js reflections and glass; compress textures before inlining.

## Animation and illustration

- **LottieFiles**: the Lottie Simple License allows commercial use and modification, attribution optional, no building a competing service. Individual animations can carry other terms, so check the label on each. Prefer authoring motion in GSAP; use Lottie when a designer-made animation already exists.
- **unDraw**: free for commercial use with no attribution; no redistribution in packs, no AI training without written permission. Its look is generic and recognisable, so recolour to the palette and use sparingly.
- **Open Peeps / Open Doodles** (Pablo Stanley): CC0 hand-drawn sets, free for any use. Same caution: a pack look is a tell if it is the whole design.
