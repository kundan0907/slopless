# Craft floor

Read right before editing UI. Build without announcing the checklist; verify it on the built result.

- **Contrast:** body ≥ 4.5:1, large text and meaningful icons ≥ 3:1. On coloured fields tint secondary text from the field's hue; never plain grey.
- **States:** hover, press, focus-visible, disabled, loading, empty, error, for every control. Press feedback within 80–150ms and without layout shift.
- **Browser surfaces:** theme `::selection`, `caret-color`, `accent-color`, focus rings, scrollbars, link underline offset, tabular numerals. The cheapest proof something was built, not assembled.
- **Icons:** reuse the existing icon library and offline assets; fetch new icons only when needed with `scripts/assets.mjs` (see `assets.md`) and inline as SVG, one stroke weight, one style per level. Never emoji or unicode glyphs as icons. Icon-only controls have accessible names.
- **Depth:** shadows have offset and soft blur; a zero-offset coloured halo is decoration.
- **Spacing:** read computed values; tight groups, generous separation.
- **Type:** measure 45–75ch, headlines ≤ 2 lines at every width, real copy at every breakpoint.
- **Images:** real or none. Correct aspect ratio, never stretched, reserved space (no CLS), alt text. Found images credited.
- **Theme:** no flash of the wrong theme; both themes checked if both exist.
- **Semantics:** real buttons and links, landmarks, focus order matches visual order, `lang` set.
- **Copy:** the product's own words; controls name their action; errors say what happened and how to recover.
- **Coverage:** every requirement in the brief is present and findable within seconds.
- **Single-file deliverables:** fonts, images, scripts inlined; open it from `file://` once and confirm nothing is missing.
