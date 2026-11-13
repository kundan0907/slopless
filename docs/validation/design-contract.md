# Deterministic design-contract validation

Base: `cf070fe12f7ff32e2b565e6359458fce73316087`. This is an additive extension of the existing slopless skill, not a replacement with upstream unslop. Three Terra agents handled source comparison, before/after behavioral trials and independent review; the lead implemented the integration and checked rendered evidence.

## Additions by file

| File | Addition |
| --- | --- |
| `slopless/SKILL.md` | Always-loaded execution-contract pointer, exact source credit, no-slop preservation exception, Direction/Visuals/Motion integration. Frontmatter unchanged. |
| `slopless/references/run-contract.md` (new) | Audit classification, direction authority and taste observation, nine ordered passes, conditional launch planning/rehearsal, checklist, anchored 20-point rubric, derived recapture/fix/ship disposition. |
| `slopless/references/reel-learnings.md` (new) | All three supplied reel descriptions, example names, twenty principles and demos, four taste examples, verified repository revisions, source caveats and license notices. |
| `slopless/references/direction.md` | Taste-calibration and approval pointer. |
| `slopless/references/motion.md` | Strict timing precedence, shared motion roles, arcs, frequency, interruption, reduced motion, twenty checkable decisions and rehearsal evidence. |
| `slopless/references/quick.md` | Same ordered contract with compact records; good-screen preservation and no default research tour. |
| `slopless/references/review.md` | Required evidence and score gate; read-only review, recapture on missing proof. |
| `slopless/references/visual-quality.md` | Connect five critique dimensions to the nine-pass contract without a competing execution order. |
| `slopless/references/report.md` | Evidence record, unavailable checks and explicit recapture outcome. |
| `slopless/scripts/slop-scan.mjs` | Literal CSS duration and simple straight-path candidates; unresolved/framework candidates warn. Comments, quoted examples and duration delays handled separately. |
| `slopless/scripts/test/slop-scan.test.mjs` | Four regressions: timing boundary/seconds/delays, curved versus straight path, comments/variables, CSS strings/framework context. |
| `README.md` | Workflow, motion, evidence and source additions. |
| `NOTICE` | Source credit, license and adaptation scope, retaining the original notice. |
| `showcase/src/home.html` | New run-contract section. |
| `showcase/src/explore.html` | Matching toolbox section. |
| `docs/index.html` | Same section inserted into the published standalone homepage. |
| `docs/explore.html` | Same section inserted into the published standalone toolbox. |
| `docs/validation/design-contract.md` (new) | This evidence and limitations record. |

Deliberately unchanged: all original lines, skill trigger/frontmatter, original licensing metadata, dependency manifests and lockfile, existing routes and references, palettes and components, controllers and demo motion implementation, original showcase identity and content. No claimed conversion uplift, fabricated product proof or additional feature. Longer legacy timing prose remains intact; the new motion contract explicitly limits its applicability.

## Automated verification

- Node 22.23.3: `SLOPLESS_BROWSER_TESTS=1 node --test slopless/scripts/test/*.test.mjs`: **25 passed, 0 failed, 0 skipped**. This includes real Chromium deck navigation, editable controls, rapid/reverse advances, reduced motion, dimensions and readiness for existing long handoffs.
- `node --check slopless/scripts/slop-scan.mjs`: passed. No repository ESLint or TypeScript gate exists for these JavaScript/Markdown additions.
- `npm ci --ignore-scripts --no-audit --no-fund` and `npm run build --prefix showcase`: passed, using the existing lockfile. Both generated pages contain exactly one contract section. Generated pages were compared in a temporary validation run; the committed pages retain their original bytes/lines plus the inserted section, avoiding unrelated rebundling and excerpt changes.
- `git diff --check`: passed. All original edited-file lines were checked as an ordered subsequence of the updated bytes. Skill frontmatter was compared byte-for-byte.
- Read updated SKILL.md end to end. The contract explicitly resolves Quick versus preservation, six outer steps versus nine implementation passes, five critique lenses, optional earlier scores versus the required compact gate, and older cinematic durations versus the strict UI cap.

Initial scanner regressions failed on the old implementation, then passed after the addition. Independent review found and prompted fixes for CSS comments/variable fallback false positives, string/framework candidates, a competitor-test preservation loophole and missing disposition for unavailable project checks. No agent review is presented as proof of universal design quality.

## Rendered behavioral trial

Screen: the repository's existing launch-style product story, `docs/index.html`, `#language [data-mpv]`: Queue → Build → Phone. Review-only, inherited site identity; no redesign authorized. Chromium inspected 1440×900 and 390×900. Source and runtime data were kept separately from pixel observations.

Direction calibration opened Unbelievably Crap and inspected its rendered screenshot: a central multicolored dithered figure on black, small edge annotations and bottom INDEX/WORK/GALLERY navigation. The borrowed principle was a single dominant focal object; the target retained its blue stage and ticket narrative. No claim was made about untested cursor or button behavior.

The updated trial recorded Audit, approval authority, all nine pass rows, pass 8's Stageshow planning/poster/rehearsal requirements, all twenty pass 9 decisions, checklist and report. The pass 8 plan was explicitly a retrospective review reconstruction, not fabricated evidence of pre-code planning. It required further rehearsal instead of declaring completion.

New rules caught what the old skill did not prohibit:

- The first ticket leg changes x while y stays constant: a confirmed straight trajectory. The old skill had no arc requirement.
- Runtime GSAP children measured **1.1s, 0.9s, 1.1s** at both widths. The old motion guidance allowed 900–1600ms handoffs; the new strict cap rejects them.
- The final mobile ticket is scaled to 0.6; the inspected frame exposes very small text, requiring a legibility repair/recheck. This remains a finding in the existing demo, not an undocumented scope expansion.

Deliberate isolated violation: `.mpv-ticket{offset-path:path('M0 0 L24 0');transition:offset-distance 360ms ease;}`. The updated scanner returned **FAIL motion-duration** and **FAIL motion-straight-path**. Chromium independently computed **0.36s** and `path("M 0 0 L 24 0")`. The injected style was never committed to the showcase.

Captured 13 timeline positions at each width (26 images), plus reduced-motion and new contract-section images. Both widths had no document overflow; reduced-motion pages had no running preview timeline; no page errors were recorded. The lead inspected both full contact sheets and individual representative frames. The Terra trial also inspected representative frames and the actual taste-reference image.

**Trial disposition: recapture**, with confirmed fixes needed afterward. Timeline seeking is sampled manual frame rehearsal, not continuous playback or a Stageshow gate. No `rehearsal passed` result was claimed. Live input latency, every consecutive frame, full replay/interruption, keyboard/focus, contrast across palettes, zoom, all modes and physical-device performance remain unverified. The workflow caught these missing checks instead of calling the scene done.

## Source verification and limits

All three requested repositories were cloned and read before implementation. `reel-learnings.md` pins each commit. Stageshow's skill version is 1.1.1; its package version is separately 0.1.0. Its actual React kit and filming dependencies were not added to slopless.

Instagram fetching was throttled. The reels' identities, demos, job-title claims and DM-gated resources remain supplied observations. No URL was guessed for Twomuch, Shopify Fall '26 or the truncated editorial site. Unbelievably Crap was fetched and rendered; its specific reel-described interactions were not exercised. License/source links were opened or cloned. No quotes, prices or external claims were added as product proof.

No universal visual-quality or conversion guarantee is made. The deterministic path and measurable gate reduce specific failures; they cannot prove all possible future model outputs.

The full showcase source scan was also run: each generated page reports 15 `motion-duration` failures and 12 `motion-unresolved` warnings from existing shared CSS. These are newly detected legacy candidates, not a green showcase release gate. They were not silenced or rewritten. The existing demo's confirmed timing/path failures and remaining candidates stay explicit; the scoped change publishes the skill contract and explanatory site section, not a claim that all old examples now conform.

## Additive diff summary

`18 files changed, 443 insertions(+), 0 deletions(-)` against the base revision. All 15 edited pre-existing files retain every original line in its original order; three files are new. SKILL.md adds eight lines; its original frontmatter and all original body lines are unchanged.
