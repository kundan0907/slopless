# slopless

An agent skill that makes Claude Code, Codex and other coding agents design like someone who decided every pixel: decks, landing pages, portfolios, app screens and graphics that don't look AI-made.

[![slopless showcase, Obsidian Brass palette](docs/images/hero-obsidian-brass.jpg)](https://kundan0907.github.io/slopless/)

**[Open the live showcase →](https://kundan0907.github.io/slopless/)** A short page: what slopless does, a before and after you can drag, the palettes, and how to install it.

**[Open the toolbox →](https://kundan0907.github.io/slopless/explore.html)** The interview simulator, what your agent reads, modes explorer, assets, more examples, the knowledge base and a prompt cookbook, all running in your browser.

Each page is one self-contained file (`docs/index.html`, `docs/explore.html`), built with the skill and checked by its own scanner.

## What it does

slopless works in six steps:

1. **Interview** — asks about the story first: who it's for, the one sentence they should leave with, and the object that travels through it. Then it asks about taste. It asks at most four questions at a time, and each one comes with a recommended answer.
2. **Direction** — lists things only your subject has, writes one idea sentence for the design, and picks a palette, type, layout and motion level.
3. **Prove** — on big jobs, builds two small live studies on your real content. You pick one before anything is fully built.
4. **Build** — sets the colour and type tokens first, then builds the opening, then every other part. GSAP, Three.js and WebGL motion are used only when the motion explains something.
5. **Verify** — a scanner checks for generated-design tells, it takes screenshots at every size in a real browser, scores them against a ten-pass critique, and fixes everything in one batch.
6. **Learn** — saves every correction you make to `~/.slopless/taste.md`, so the next project starts from your taste.

![A generated landing hero next to the decided version](docs/images/before-after.jpg)

## Try it in the toolbox

The [explore page](https://kundan0907.github.io/slopless/explore.html) is interactive. Everything runs in the browser from the single HTML file; nothing is uploaded.

**Interview simulator.** A handful of plain questions (one optional sentence, everything else a tap) ending in "Here is the prompt to paste into your agent". The palette and motion level you pick apply to the page.

![Interview simulator](docs/images/interview-simulator.jpg)

**What your agent reads.** Pick a job (deck, landing page, app screen, graphic, review) and see the exact files it loads, in order: the SKILL.md router, the surface and references, the scripts it runs. The excerpts are cut from the real files at build time and link to GitHub.

![What your agent reads](docs/images/what-your-agent-reads.jpg)

**Assets.** Icon sets from four families (fetched at build time with `assets.mjs` and inlined), a CSS device frame from real dimensions, and every source with its licence.

![Assets](docs/images/assets.jpg)

**Modes explorer.** Surfaces (deck, web, app, graphic), review modes (review, bolder, quieter, distill, harden), motion levels (still, subtle, cinematic, spatial: picking one re-runs a shared scene with a card, a device and a ticket in that level, in the interview, here and in the design-language section, and the choice is saved), agents mode and taste memory. Each shows what it does, what triggers it, an example prompt and the reference files it loads.

![Modes explorer](docs/images/modes.jpg)

**Examples.** A deck slide, a landing hero, an app screen on a phone with real proportions and a social post, each built twice in HTML and CSS. Drag the handle, or use the arrow keys, to compare the generated look with the decided one in the current palette.

![Before and after gallery](docs/images/examples.jpg)

**How it differs.** What slopless adapted from Impeccable, taste-skill and UI/UX Pro Max (taken from NOTICE), and what it adds, each linked to the file that defines it. It is not a benchmark.

![How it differs](docs/images/comparison.jpg)

**Knowledge base, inspirations and prompts.** Every reference file and script with a one-line summary and a GitHub link (filterable), the galleries, effect libraries and reading from `inspiration.md`, and a cookbook of prompts with copy buttons.

## Ten palettes

Each palette has a job and passes contrast checks. Pick one, rename it, or bring your own brand colours and slopless derives the rest of the palette.

![Palettes](docs/images/palettes.jpg)

| Vermilion | Glacier | Sapphire Glass |
| --- | --- | --- |
| ![](docs/images/hero-vermilion.jpg) | ![](docs/images/hero-glacier.jpg) | ![](docs/images/hero-sapphire.jpg) |

## Any surface

Talks and demo decks with presenter-paced beats, landing pages and portfolios, iOS / Android / React Native screens, and social posts or posters exported at exact sizes.

## Agents mode (opt-in)

Agents mode is off by default. On a big job, slopless offers it once and you choose how many helpers to use, from one to four: builder(s), a motion/3D builder, and a reviewer + visual QA. Mechanical work runs on cheaper models. Only the lead and the signature move use the top tier.

![Agents mode](docs/images/agents.jpg)

## How to prompt it

```text
Use slopless. I'm giving a 15-minute talk to our platform team on how we cut release time. Here's my outline.
Use slopless to redesign this landing page. Keep every word. It looks like every other AI site.
slopless, three Instagram posts announcing our beta, Porcelain Cobalt, 1080×1350.
Use slopless in agents mode with three helpers. Rebuild the deck in the Sapphire Glass direction.
Use slopless to review this screen. Why does it look generated?
```

![Prompts](docs/images/prompts.jpg)

## Install

```sh
# any agent that supports skills
npx skills add kundan0907/slopless

# or by hand
git clone https://github.com/kundan0907/slopless
cp -r slopless/slopless ~/.claude/skills/     # Claude Code
cp -r slopless/slopless ~/.agents/skills/     # Codex and others
```

Optional, for the screenshot step: `npm i -D playwright && npx playwright install chromium`.

## Tools in the skill

```sh
node slopless/scripts/slop-scan.mjs <files|dir>     # FAIL/WARN on violet gradients, gradient text, emoji icons, stock copy, eyebrows, glows…
node slopless/scripts/shoot.mjs page.html --deck --steps 12   # screenshots for review
node slopless/scripts/contrast.mjs '#ECE8E1' '#0B0C0F'        # WCAG ratio
node slopless/scripts/assets.mjs icon lucide:arrow-right --size 24 --stroke 1.5   # real SVG from Iconify
node slopless/scripts/assets.mjs icons lucide arrow-right,check --out ./icons
node slopless/scripts/assets.mjs search arrow --prefix lucide
node slopless/scripts/assets.mjs font "Hanken Grotesk" --weights 400..700 --out ./fonts [--inline]
node slopless/scripts/assets.mjs photo "night train"          # Openverse, commercial-use licences
node --test slopless/scripts/test/*.mjs
```

Wrap deliberate bad examples in `<!-- slopless-ignore-start -->` … `<!-- slopless-ignore-end -->`.

## How it stays light

`SKILL.md` is a short router. Each step loads only its own reference file (interview, direction, palettes, type, layout, motion, craft floor, copy, assets, tells, review, memory, agents, plus one file per surface), so a small fix never pulls in the whole library.

## Repository

```
slopless/            the skill (copy this folder)
  SKILL.md
  references/        loaded on demand
  scripts/           slop-scan, shoot, contrast, assets (+ tests)
showcase/            source of docs/index.html and docs/explore.html (npm i && npm run build)
docs/                the two built pages and README images
```

## Credits

slopless adapts ideas, in its own words, from [Impeccable](https://github.com/pbakaus/impeccable) (Apache-2.0), [taste-skill](https://github.com/leonxlnx/taste-skill) (MIT) and [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (MIT). See [NOTICE](NOTICE). The showcase uses Three.js (MIT), GSAP (free under its standard licence), and Bricolage Grotesque and Hanken Grotesk (SIL OFL 1.1).

MIT licensed.
