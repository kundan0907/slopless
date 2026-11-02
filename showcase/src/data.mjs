// Static content for the knowledge base, inspirations and prompt cookbook. Rendered into index.html by build.mjs.
export const REPO = 'https://github.com/kundan0907/slopless/blob/main/';

// [path, one line, loaded when]
export const KB = [
  ['Router', [
    ['slopless/SKILL.md', 'Routes to Quick, Standard, Deep or Review before loading specialist guidance.', 'Always'],
    ['slopless/references/quick.md', 'Focused V2: intentional visual improvement, preserved content/behavior, before-and-after evidence.', 'Existing refinements'],
    ['slopless/references/storytelling.md', 'Claims, evidence and composition matched to the information.', 'New or redesigned story'],
    ['slopless/references/visual-quality.md', 'Five rendered passes: hierarchy, composition, reading, interaction and fit.', 'Visual verification'],
    ['slopless/references/browser.md', 'Host browser first, cached automatic CLI setup, honest offline limits.', 'Browser checks'],
  ]],
  ['The loop', [
    ['slopless/references/interview.md', 'Story first, then taste. Four questions a round, options with a recommended default, a playback summary.', 'Step 1'],
    ['slopless/references/direction.md', 'Inventory the subject, write the idea sentence, run the competitor test, pick a colour strategy.', 'Step 2'],
    ['slopless/references/palettes.md', 'Ten palettes with tokens, strategy and best use, plus how to derive a custom brand palette.', 'Step 2'],
    ['slopless/references/type.md', 'Type laws, faces that read as decided, training-data defaults to avoid, loading and slides.', 'Step 2'],
    ['slopless/references/layout.md', 'Composition, space, surfaces, fullness and the responsive rules.', 'Step 2'],
    ['slopless/references/motion.md', 'The four motion levels, connected storytelling, curves, timelines, 3D, glass and reduced motion.', 'Choosing motion'],
    ['slopless/references/brief.md', 'The one-screen brief template that doubles as a handoff.', 'Writing the brief'],
    ['slopless/references/craft-floor.md', 'Contrast, states, browser surfaces, icons, depth, semantics: the checks before editing UI.', 'Step 4'],
    ['slopless/references/copy.md', 'Write the argument first, plain voice, banned patterns and words.', 'Step 4'],
    ['slopless/references/assets.md', 'Licence-checked icon sets, fonts, photos, device dimensions, 3D and animation sources, and the rules for using them.', 'Step 4'],
  ]],
  ['Surfaces', [
    ['slopless/references/surfaces/deck.md', 'Preserve existing decks; optional dependency-free controller for new builds, cinematic timelines when needed.', 'Deck jobs'],
    ['slopless/references/surfaces/web.md', 'Landing pages and portfolios: first screen, claim-to-proof sections, imagery order, build and verify.', 'Web jobs'],
    ['slopless/references/surfaces/app.md', 'iOS, Android, React Native and dashboards: platform fit, states, dark mode, verify.', 'App jobs'],
    ['slopless/references/surfaces/graphic.md', 'Posts, posters and brand boards: sizes, safe areas, HTML-to-PNG export.', 'Graphic jobs'],
  ]],
  ['Review and memory', [
    ['slopless/references/review.md', 'Rendered critique and semantic preservation checks; optional scores and review lenses.', 'Step 5, any review'],
    ['slopless/references/tells.md', 'The registry of tells by wave, with banned or warned status and which ones the scanner finds.', 'Step 5, any review'],
    ['slopless/references/memory.md', 'The taste file and the project DESIGN.md: what to write, when, and who wins.', 'Writing memory'],
    ['slopless/references/agents.md', 'Opt-in helpers: roles, model tiers, how many, the flow and the helper brief.', 'You opt in'],
    ['slopless/references/inspiration.md', 'Galleries, effect libraries and reading, plus how to research a technique.', 'You want references'],
  ]],
  ['Starter', [
    ['slopless/assets/deck-controller.js', 'Optional dependency-free controller for new HTML decks; readiness, cancellation and reduced motion.', 'New deck only'],
  ]],
  ['Scripts', [
    ['slopless/scripts/slop-scan.mjs', 'Static scan for tells in HTML, CSS, JS and copy. Prints FAIL and WARN lines.', 'Step 5'],
    ['slopless/scripts/shoot.mjs', 'Automatic cached setup, Quick capture, exact export sizes, readiness and beat manifest.', 'Step 5'],
    ['slopless/scripts/contrast.mjs', 'WCAG contrast ratio for two hex colours.', 'Palette checks'],
    ['slopless/scripts/assets.mjs', 'Fetch icons from Iconify, fonts from Google Fonts and photos from Openverse.', 'New assets only'],
    ['slopless/scripts/browser.mjs', 'Pinned cached runtime and one-attempt browser provisioning without project changes.', 'CLI capture'],
    ['slopless/scripts/cli.mjs', 'Canonical entry-point checks for installed symlinks and encoded paths.', 'CLI execution'],
    ['slopless/scripts/test/slop-scan.test.mjs', 'Tests for the scanner rules and the contrast maths.', 'Changing the scanner'],
    ['slopless/scripts/test/assets.test.mjs', 'Tests for argument parsing, SVG rewriting and font CSS parsing. No network.', 'Changing assets.mjs'],
    ['slopless/scripts/test/cli.test.mjs', 'Executable CLI, symlink, source scan and argument regressions.', 'CLI changes'],
    ['slopless/scripts/test/browser.test.mjs', 'Offline lookup, cached setup and bounded install failure checks.', 'Runtime changes'],
    ['slopless/scripts/test/deck-browser.test.mjs', 'Real browser navigation, editable controls, long handoffs and capture dimensions.', 'Browser validation'],
  ]],
];

// [name, url, what to study]
export const GALLERIES = [
  ['Awwwards', 'https://www.awwwards.com', 'Jury-scored sites. Study high-end and experimental motion.'],
  ['Godly', 'https://godly.website', 'Curated and shown as video. Study animated landing pages.'],
  ['Land-book', 'https://land-book.com', 'Landing pages and portfolios sorted by type.'],
  ['Siteinspire', 'https://www.siteinspire.com', 'Minimal, typography-led sites.'],
  ['One Page Love', 'https://onepagelove.com', 'Single pages and portfolios.'],
  ['Minimal Gallery', 'https://minimal.gallery', 'Restrained, editorial work.'],
  ['Mobbin', 'https://mobbin.com', 'Real app screens and flows on iOS, Android and web.'],
  ['Apple product pages', 'https://www.apple.com', 'Pacing, type scale and scroll-driven product storytelling.'],
];
export const EFFECTS = [
  ['Canvas UI', 'https://canvasui.dev', 'WebGL and WebGPU effects: liquid, glass, ripple, clouds, grid. MIT with Commons Clause.'],
  ['Whitespace experiments', 'https://experiments.thisiswhitespace.com', 'Optical glass and hero studies.'],
  ['ThreeUI', 'https://threeui.com', 'Interactive 3D landing sections.'],
  ['Codrops', 'https://tympanus.net/codrops', 'WebGL, shader and scroll tutorials with source.'],
  ['GSAP showcase', 'https://gsap.com/showcase', 'Production timelines and ScrollTrigger.'],
  ['Three.js examples', 'https://threejs.org/examples', 'The reference for materials, loaders and post effects.'],
];
export const READING = [
  ['Why your AI keeps building the same purple gradient website', 'https://prg.sh/ramblings', 'prg.sh/ramblings. The case for naming the defaults.'],
  ['Impeccable', 'https://github.com/pbakaus/impeccable', 'Anti-patterns and craft floor.'],
  ['taste-skill', 'https://github.com/leonxlnx/taste-skill', 'Gallery study and tells registry.'],
  ['Emil Kowalski skills', 'https://github.com/emilkowalski/skills', 'UI polish and motion.'],
  ['GSAP agent skills', 'https://github.com/greensock/gsap-skills', 'The official GSAP skills for agents.'],
];

// [group, [prompt, note]]
export const PROMPTS = [
  ['Quick V2', [
    ['Use slopless quick. Make this a better V2. Keep the content, data and working controls.', 'Default refinement path: three high-impact fixes and one repair batch.'],
  ]],
  ['Deck', [
    ["Use slopless. I'm giving a 15-minute talk to our platform team on how we cut release time. Here's my outline.", 'Runs the interview, then builds a deck with presenter controls.'],
    ['Use slopless to rebuild this deck in Sapphire Glass, cinematic motion. Keep every number and the speaker notes exactly as they are.', 'A redesign that treats your outline as the source of truth.'],
  ]],
  ['Web', [
    ['Use slopless to redesign this landing page. Keep every word. It looks like every other AI site.', 'Scan and screenshots first, then a scored critique and one batch of fixes.'],
    ['slopless, portfolio for a motion designer. Moss Paper, subtle motion. One signature interaction that is about her craft.', 'Palette and motion level given up front, so the interview skips them.'],
  ]],
  ['App', [
    ['Use slopless on this onboarding screen for iOS. 390 by 844, dark and light, add empty and error states.', 'Loads the app surface file: platform fit, states, both themes.'],
  ]],
  ['Graphic', [
    ['slopless, three Instagram posts announcing our beta, Porcelain Cobalt, 1080 by 1350.', 'Built in HTML, exported at exact size, one template for the set.'],
  ]],
  ['Review and modes', [
    ['Use slopless to review this screen. Why does it look generated?', 'Review mode: inspect the rendering, report three concrete problems and verification limits.'],
    ['Use slopless: make this hero bolder.', 'Bigger scale contrast, a committed colour field, one signature move. Swap in quieter, distill or harden.'],
  ]],
  ['Agents and memory', [
    ['Use slopless in agents mode with three helpers. Rebuild the deck in the Sapphire Glass direction.', 'Builder, motion and reviewer run in parallel on a shared core.'],
    ['Remember for slopless: I reject decorative colour bars and I want two live studies before a full build.', 'Becomes dated lines in your taste file.'],
  ]],
];

// [category, name, url, licence, note]
export const SOURCES = [
  ['Icons', [
    ['Lucide', 'https://lucide.dev', 'ISC', 'Default UI set, clean 24px outline.'],
    ['Phosphor', 'https://phosphoricons.com', 'MIT', 'Six weights per icon, plus duotone.'],
    ['Tabler Icons', 'https://tabler.io/icons', 'MIT', 'Very large outline set.'],
    ['Heroicons', 'https://heroicons.com', 'MIT', 'Outline and solid pairs.'],
    ['Material Symbols', 'https://fonts.google.com/icons', 'Apache-2.0', 'Android and Material apps.'],
    ['Iconoir', 'https://iconoir.com', 'MIT', 'A more characterful outline set.'],
    ['Remix Icon', 'https://remixicon.com', 'Apache-2.0', 'Line and fill pairs, broad coverage.'],
    ['Iconify API', 'https://iconify.design', 'per set', 'One API for all of the above, used by assets.mjs.'],
  ]],
  ['Fonts', [
    ['Google Fonts', 'https://fonts.google.com', 'OFL and similar', 'Free for commercial use, self-hostable.'],
    ['Fontshare', 'https://www.fontshare.com', 'ITF Free Font License', 'Free for personal and commercial use.'],
  ]],
  ['Photos', [
    ['Unsplash', 'https://unsplash.com/license', 'Unsplash License', 'Free for commercial use, credit appreciated. No reselling unaltered.'],
    ['Openverse', 'https://openverse.org', 'Per item (CC0, CC BY, CC BY-SA)', 'Search across open collections, keep the credit.'],
    ['Wikimedia Commons', 'https://commons.wikimedia.org', 'Per file, often CC BY-SA', 'Copy the attribution text from each file page.'],
  ]],
  ['Devices', [
    ['Apple Design Resources', 'https://developer.apple.com/design/resources/', 'Apple terms', 'Official iPhone, iPad and Mac artwork for marketing Apple-platform apps.'],
    ['Real dimensions in CSS', 'https://github.com/kundan0907/slopless/blob/main/slopless/references/assets.md', 'n/a', 'iPhone, Pixel and MacBook sizes, drawn in CSS.'],
  ]],
  ['3D and motion', [
    ['Poly Haven', 'https://polyhaven.com', 'CC0', 'HDRIs, textures and models, no credit needed.'],
    ['LottieFiles', 'https://lottiefiles.com/page/license', 'Lottie Simple License', 'Commercial use allowed; check each file.'],
    ['unDraw', 'https://undraw.co/license', 'unDraw License', 'Free, no credit; no packs or AI training.'],
    ['Open Peeps', 'https://www.openpeeps.com', 'CC0', 'Hand-drawn people, free for any use.'],
  ]],
];

// What each job loads: [path, role, start pattern (null = after the title), max lines]
export const JOBS = [
  ['quick', 'Quick V2', [
    ['slopless/SKILL.md', 'Router', '^## Choose', 12], ['slopless/references/quick.md', 'Reference', null, 10], ['slopless/references/browser.md', 'Reference', null, 8]]],
  ['deck', 'Talk or deck', [
    ['slopless/SKILL.md', 'Router', '^## Choose', 12], ['slopless/references/surfaces/deck.md', 'Surface', null, 9], ['slopless/references/motion.md', 'Reference', null, 9], ['slopless/references/craft-floor.md', 'Reference', null, 8],
    ['slopless/scripts/slop-scan.mjs', 'Script', null, 8], ['slopless/scripts/shoot.mjs', 'Script', null, 8]]],
  ['web', 'Landing page', [
    ['slopless/SKILL.md', 'Router', '^## Choose', 12], ['slopless/references/surfaces/web.md', 'Surface', null, 9], ['slopless/references/layout.md', 'Reference', null, 9], ['slopless/references/craft-floor.md', 'Reference', null, 8], ['slopless/references/assets.md', 'Reference', null, 9],
    ['slopless/scripts/assets.mjs', 'Script', null, 9], ['slopless/scripts/slop-scan.mjs', 'Script', null, 8], ['slopless/scripts/shoot.mjs', 'Script', null, 8]]],
  ['app', 'App screen', [
    ['slopless/SKILL.md', 'Router', '^## Choose', 12], ['slopless/references/surfaces/app.md', 'Surface', null, 9], ['slopless/references/craft-floor.md', 'Reference', null, 8], ['slopless/references/assets.md', 'Reference', null, 9],
    ['slopless/scripts/assets.mjs', 'Script', null, 9], ['slopless/scripts/shoot.mjs', 'Script', null, 8]]],
  ['graphic', 'Graphic', [
    ['slopless/SKILL.md', 'Router', '^## Choose', 12], ['slopless/references/surfaces/graphic.md', 'Surface', null, 9], ['slopless/references/palettes.md', 'Reference', null, 9], ['slopless/references/assets.md', 'Reference', null, 9],
    ['slopless/scripts/assets.mjs', 'Script', null, 9], ['slopless/scripts/shoot.mjs', 'Script', null, 8]]],
  ['review', 'Review', [
    ['slopless/SKILL.md', 'Router', '^## Choose', 12], ['slopless/references/review.md', 'Reference', null, 9], ['slopless/references/tells.md', 'Reference', null, 9],
    ['slopless/scripts/slop-scan.mjs', 'Script', null, 8], ['slopless/scripts/shoot.mjs', 'Script', null, 8]]],
];
