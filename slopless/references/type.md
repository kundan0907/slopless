# Type

Type is the cheapest way to look decided and the commonest way to look generated.

## Laws
- Two or three sizes do the visible work: one very large, one reading size, one small. Five sizes per view at most.
- Display: tracking −0.02 to −0.04em, leading 0.9–1.05, weight chosen on purpose (light wide, or heavy condensed; not a timid 600). Headlines fit in two lines at every width; cut words before shrinking.
- Reading text: 16–20px web, 17px iOS body, 24–32px on slides; leading 1.45–1.6; 45–75 characters per line; full ink colour.
- Left-aligned by default; centre one moment at most.
- Tabular figures (`font-variant-numeric: tabular-nums`) wherever numbers align.
- Optical details: `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs, real quotes and apostrophes, non-breaking spaces between number and unit.
- One family is normal; two is the limit. Monospace only for code, IDs, data.

## Faces that read as decided (pick from the subject, not this list)
- Wide or variable grotesks: Archivo (width axis), Bricolage Grotesque, Familjen Grotesk, Schibsted Grotesk, Hanken Grotesk, Geist, Satoshi, General Sans, Cabinet Grotesk.
- Serifs with character for editorial: Newsreader for long reading, Gloock / Young Serif / Bodoni Moda for display.
- Inside drawn device screens: the platform stack (`-apple-system, BlinkMacSystemFont, system-ui` or Roboto on Android) so the device looks real.

## Training-data defaults (need a reason the subject gives you)
Inter or Roboto as display, DM Sans, Space Grotesk, Outfit, Plus Jakarta Sans, Instrument Sans/Serif, Fraunces, Playfair Display, IBM Plex everywhere, Space Mono / JetBrains Mono as a "techy" voice.

## Loading
Self-host or inline as WOFF2 for single-file deliverables. Subset to the characters used when size matters. `font-display: swap` with a metric-matched fallback to avoid layout shift. Check the font actually loaded (the screenshot, or `document.fonts.check`).

## Slides
Title 56–96px, body 28–36px, captions ≥ 20px at 1920×1080. One idea per slide; if the text needs to be smaller than 24px, it is a handout, not a slide.
