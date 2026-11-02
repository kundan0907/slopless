# Palettes

Ten starting palettes, not ten required styles. Each assigns ground, ink, accent and panel roles. Existing brand tokens and the user's exact choices come first. Do not replace a working design system to demonstrate this library, or add a palette interview to an otherwise complete Quick brief.

## Choose like a designer

1. Read the existing brand, content, explicit preferences and intended viewing conditions. Preserve pinned colours; distinguish an agent's assumption from a user choice.
2. Decide what colour must communicate: the primary action, a meaningful state, categories or the subject's material. Give each colour a role before choosing its hex value. Typography, spacing and shape must support the same direction.
3. Derive a small set of neutrals and semantic accents from that context, or adapt one of the presets below. The user can choose a preset, supply exact brand colours, change the material or request a quieter direction. Offer alternatives only when the direction is unresolved or choices were requested.
4. Check actual foreground/background pairs in controls, evidence panels, selected/disabled states and themes. The supplied presets have checked ink/ground pairs; that does not certify every component or translucent layer. Body text needs 4.5:1; large text and meaningful icons need 3:1.
5. Inspect a real-content rendering. If meaning depends on a colour, also use text, shape or position. Record the user's approved direction and meaningful token roles, not an inferred personal taste.

Token roles (use these names everywhere; components reference tokens only):

```css
--ground  --ink  --muted  --accent  --accent-ink  --panel  --panel-ink  --line  --ok  --warn  --bad
```

`--line` is rare (tables, form fields). `--ok/--warn/--bad` mean state and are always named in text too.

| Name | Strategy | Mood | Best for |
| --- | --- | --- | --- |
| Vermilion | Drenched | bold, loud, confident | portfolio, keynote opener |
| Obsidian Brass | Restrained dark | cinematic, luxurious | product launch, 3D hero, decks |
| Glacier | Restrained light | calm, trustworthy | product demo, docs, app UI |
| Sapphire Glass | Restrained dark + glass | premium tech, Apple-like | demo decks, devices on stage |
| Graphite Signal | Restrained dark | engineering, hardware | tech talks, dashboards |
| Moss Paper | Restrained light | editorial, quiet | writing, case studies, research |
| Porcelain Cobalt | Committed light | crisp, modern, graphic | landing pages, social graphics |
| Oxblood | Drenched dark | warm, serious, memorable | storytelling, culture, finance |
| Blueprint Slate | Full palette dark | systems, diagrams | architecture, workflows |
| Klein | Drenched | gallery, art-direction | posters, covers, statement slides |

```css
/* Vermilion — keep panels black; red is the field, not the button */
--ground:#E4401E; --ink:#140B08; --muted:#1F0A05; --accent:#140B08; --accent-ink:#E4401E;
--panel:#16100D; --panel-ink:#F6EDE4; --line:rgb(20 11 8/.22);

/* Obsidian Brass — warm metal light on near-black; brass only on the action and figures */
--ground:#0B0C0F; --ink:#ECE8E1; --muted:#9C978E; --accent:#D6AE6B; --accent-ink:#0B0C0F;
--panel:#15171B; --panel-ink:#ECE8E1; --line:#24262B;

/* Glacier — cool paper, slate ink, one steel blue */
--ground:#EDF1F4; --ink:#16202A; --muted:#55626F; --accent:#2C5A88; --accent-ink:#FFFFFF;
--panel:#FFFFFF; --panel-ink:#16202A; --line:#D3DAE1;

/* Sapphire Glass — deep blue stage, frosted story cards, opaque evidence */
--ground:#070B18; --ink:#E8EEFA; --muted:#98A6C4; --accent:#9DB7FF; --accent-ink:#070B18;
--panel:#0F1730; --panel-ink:#E8EEFA; --line:#1D2847;
--glass-fill:rgb(255 255 255/.07); --glass-rim:rgb(255 255 255/.16); --glass-hi:rgb(255 255 255/.22);

/* Graphite Signal — matte charcoal, one signal orange */
--ground:#111214; --ink:#E7E6E2; --muted:#9A9993; --accent:#FF7A1A; --accent-ink:#111214;
--panel:#1A1B1E; --panel-ink:#E7E6E2; --line:#2A2B2F;

/* Moss Paper — stone (not cream), ink, deep moss */
--ground:#E9E8E1; --ink:#1A1E19; --muted:#565C53; --accent:#2E5638; --accent-ink:#F5F4EF;
--panel:#F5F4EF; --panel-ink:#1A1E19; --line:#CFCEC5;

/* Porcelain Cobalt — near-white with whole cobalt fields */
--ground:#F6F6F3; --ink:#0D1430; --muted:#4A5170; --accent:#2340D6; --accent-ink:#FFFFFF;
--panel:#FFFFFF; --panel-ink:#0D1430; --line:#DADBE3;

/* Oxblood — deep wine field, warm porcelain type, blush accent */
--ground:#2B0E13; --ink:#F4E7E0; --muted:#C9A79F; --accent:#F0B79F; --accent-ink:#2B0E13;
--panel:#3A151B; --panel-ink:#F4E7E0; --line:#4A1F26;

/* Blueprint Slate — grid only where something is being drawn; category colours on strokes only */
--ground:#0B1220; --ink:#E6EDF7; --muted:#8C9AB0; --accent:#3DDC97; --accent-ink:#0B1220;
--panel:#121B2D; --panel-ink:#E6EDF7; --line:#1F2A40;
--cat-1:#5CC8F2; --cat-2:#B59CFF; --cat-3:#F2C14E; --cat-4:#F27A8C;

/* Klein — the surface is the colour */
--ground:#1D2BD6; --ink:#F5F4EE; --muted:#C9CCF2; --accent:#F5F4EE; --accent-ink:#1D2BD6;
--panel:#121A8C; --panel-ink:#F5F4EE; --line:rgb(245 244 238/.24);
```

Every palette needs a light or dark twin only if the user wants both. Derive it by swapping ground and ink families, keeping the accent hue, and re-checking contrast. Set the theme attribute in an inline `<head>` script so there is no flash.

## Custom brand

1. Use supplied or existing brand values and logo files. Ask for missing values only when exact brand matching matters; never present an invented brand colour as authoritative.
2. The brand colour becomes `--accent` (Restrained) or `--ground` (Committed/Drenched). Not both.
3. Derive neutrals for the brand and reading context. A slight hue tint can help; a neutral grey is valid when it fits the product. Do not add colour to create apparent sophistication.
4. Check: `node <skill>/scripts/contrast.mjs '#ink' '#ground'` — body ≥ 4.5, large text and icons ≥ 3.
5. Preserve exact choices in project tokens. Save personal taste only when the user explicitly expresses it; no naming ceremony is required.

## Rules that keep any palette premium

- The accent appears on the primary action and at most one other thing per view.
- Body text in full ink. Grey text everywhere reads unfinished.
- Surfaces separate by a tone step, not a border plus a shadow.
- Gradients only as light (a shader, a scrim under text on a photo), never as fills on buttons, text or cards.
- Per-item rainbow colours (each feature its own hue) are banned unless the colours encode categories in data.
