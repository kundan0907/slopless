// Static content for the knowledge base, inspirations and prompt cookbook. Rendered into index.html by build.mjs.
export const REPO = 'https://github.com/kundan0907/slopless/blob/main/';

// [path, one line, loaded when]
export const KB = [
  ['Router', [
    ['slopless/SKILL.md', 'The router: starts every run, classifies the job, lists the loop and the floor.', 'Always'],
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
  ]],
  ['Surfaces', [
    ['slopless/references/surfaces/deck.md', 'Talks and decks: beats, presenter-owned controls, one master timeline, offline single file.', 'Deck jobs'],
    ['slopless/references/surfaces/web.md', 'Landing pages and portfolios: first screen, claim-to-proof sections, imagery order, build and verify.', 'Web jobs'],
    ['slopless/references/surfaces/app.md', 'iOS, Android, React Native and dashboards: platform fit, states, dark mode, verify.', 'App jobs'],
    ['slopless/references/surfaces/graphic.md', 'Posts, posters and brand boards: sizes, safe areas, HTML-to-PNG export.', 'Graphic jobs'],
  ]],
  ['Review and memory', [
    ['slopless/references/review.md', 'Scan, shoot, ten scored passes, content audit, and the bolder, quieter, distill and harden modes.', 'Step 5, any review'],
    ['slopless/references/tells.md', 'The registry of tells by wave, with banned or warned status and which ones the scanner finds.', 'Step 5, any review'],
    ['slopless/references/memory.md', 'The taste file and the project DESIGN.md: what to write, when, and who wins.', 'Writing memory'],
    ['slopless/references/agents.md', 'Opt-in helpers: roles, model tiers, how many, the flow and the helper brief.', 'You opt in'],
    ['slopless/references/inspiration.md', 'Galleries, effect libraries and reading, plus how to research a technique.', 'You want references'],
  ]],
  ['Scripts', [
    ['slopless/scripts/slop-scan.mjs', 'Static scan for tells. The scanner on this page is this file, bundled.', 'Step 5'],
    ['slopless/scripts/shoot.mjs', 'Playwright screenshots at 1440, 768 and 390, or deck sizes with step-through.', 'Step 5'],
    ['slopless/scripts/contrast.mjs', 'WCAG contrast ratio for two hex colours.', 'Palette checks'],
    ['slopless/scripts/test/slop-scan.test.mjs', 'Tests for the scanner rules and the contrast maths.', 'Changing the scanner'],
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
    ['Use slopless to review this screen. Why does it look generated?', 'Review mode: scan, screenshots, ten passes, top three problems.'],
    ['Use slopless: make this hero bolder.', 'Bigger scale contrast, a committed colour field, one signature move. Swap in quieter, distill or harden.'],
  ]],
  ['Agents and memory', [
    ['Use slopless in agents mode with three helpers. Rebuild the deck in the Sapphire Glass direction.', 'Builder, motion and reviewer run in parallel on a shared core.'],
    ['Remember for slopless: I reject decorative colour bars and I want two live studies before a full build.', 'Becomes dated lines in your taste file.'],
  ]],
];
