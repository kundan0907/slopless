# Changelog

Versions cover the skill instructions and bundled tools together. Earlier commits were unversioned; this history starts with the first tagged release.

## [1.0.1] — 2026-11-13

### Fixed

- Showcase motion preview: the ticket followed a straight line on 0.9–1.1s tweens, covered the build card while its progress ran, and landed at 0.6 scale. It now travels on curved paths; each of its four tweens lasts 280ms and holds separate the beats (2.82s in total). It docks behind the build card with its title showing, so the two-step progress and a new "Checks passed" state can be read, and it lands at the phone's width. Ticket text on a 390px viewport renders at 12.5px and 11.1px; the old 0.6 scale gave 8.4px and 7.5px.
- The preview follows a live reduced-motion change, re-measures after a resize, and reaches the same settled poster with motion off. Subtle entrances finish in 260ms; the spatial tilt follows the pointer in 200ms. Replay is hidden while reduced motion is on.
- All 18 literal CSS transitions at or over 300ms in the showcase stylesheet are under the cap. The longest computed transition on the homepage is 0.28s.
- Scanner: a literal duration followed by a variable easing was reported as unresolved. This raised nine false warnings on the showcase and hid three real over-cap transitions. It is now judged.
- Scanner: a duration token whose every definition in the same source is a literal time is judged by its longest value. This applies to CSS and HTML sources only. Tokens with fallbacks, `calc()` or no local definition still ask for a computed measurement.
- Scanner: motion findings include `file:line`, which the run contract's evidence record already required.

### Added

- Run contract: a unit, period or status meaning that the source states elsewhere on the same view may be placed beside its value as a layout repair, listed under Content changes. Units the source does not state are never inferred.

### Verified

- With `SLOPLESS_BROWSER_TESTS=1`, 32 tests passed, including two Chromium tests and four new scanner regressions. Marketplace validation and the showcase build passed. Both generated pages scan at 0 FAIL, 0 WARN.
- Preview playback in headless Chromium at 1440 and 390 wide: four 0.28s tweens, done at 2.82s, largest frame gap 19ms, curved positions on both legs, replay during flight, level changes during flight, resize and live reduced motion. 23 sought frames per width were inspected. These checks ran from a one-off script, not a committed test.
- Matched Quick trial, one run per arm, same screen, prompt, model and settings: v1.0.0 used 98.7k tokens, 31 tool calls and 177s; the scanner fixes alone used 93.5k, 30 and 173s. That is no measurable difference. Both left units and status meanings in a legend and both needed a manual check of three unresolved-token warnings. A third single run added the label rule and token resolution together: it placed units in the column headers and status wording beside each mark, and scanned at 0 WARN because of the token change (90.3k tokens, 27 tool calls, 162s). Every source string survived in all three; the third run left one colourless status mark out.
- Control: a screen with no rendering available was preserved apart from one missing press state, and reported `recapture` without a visual score.

### Known limits

- The trials are single runs; they show specific defects fixed, not a general quality or cost improvement. The deck and launch-page baselines were built with v1.0.0 and inspected, but their runs were cut off before verification, so no matched comparison or cost figure exists for them.
- Other showcase motion still exceeds the strict cap or rises in a straight line: the hero heading (1.1s), supporting hero text (0.7s), before/after wipe (1.8s), posters (0.8s), footer name (1.4s), the how-it-works card scenes (0.3–0.5s with staggers) and the agent and route line draws (0.7–0.8s). They are unchanged pending a decision on whether page entrances fall under the UI cap.
- On a 390px viewport the stage height limits the lift, so the second leg bends about 7px off a straight line, and the ticket passes behind the build card during the first leg.
- An independent second review inspected the frames and diff; its findings were applied, apart from the duplicate "Phone" label, which predates this release.
- Headless frame timing is not device performance. Full Stageshow rehearsal and physical-device checks remain unverified. No universal design-quality, conversion or efficiency improvement is claimed.

## [1.0.0] — 2026-11-12

### Added

- One ordered run contract: Audit, approved Direction, nine passes, Checklist and Report across Quick, Standard, Deep and Review.
- Explicit good-screen preservation, inspected taste references and evidence-based review dispositions.
- Launch-visual planning, settled posters and frame rehearsal adapted from Stageshow.
- Twenty checkable motion principles, shared timing roles, arc paths, frequency and reduced-motion checks.
- Motion scanner rules and regression tests, source provenance, attribution and the reel-learnings reference.
- An installed version file, marketplace version, public release links and version-consistency tests.

### Verified

- All 28 tests passed, including two Chromium tests and three version-consistency tests. Marketplace validation and the showcase build passed.
- Existing skill lines and frontmatter were preserved in the design-contract update; versioning leaves SKILL.md unchanged.

### Known limits

- Existing showcase motion retains long tweens and straight travel detected by the new rules. The explanatory release links do not certify those demos.
- Full Stageshow rehearsal, gated reel material and physical-device performance remain unverified. No universal design-quality, conversion or efficiency improvement is claimed.

## Release policy

- **PATCH:** fixes and clarifications that preserve intended behavior.
- **MINOR:** compatible capabilities or workflow checks.
- **MAJOR:** changes that break an established workflow or remove supported behavior.

For each release:

1. Update `slopless/VERSION`, the version in `.claude-plugin/marketplace.json`, and the release labels in both showcase templates and both published HTML pages. Do not change skill frontmatter to carry a version.
2. Add a dated changelog entry describing the actual changes, verification and known limits. Do not invent older releases or performance results.
3. Run `SLOPLESS_BROWSER_TESTS=1 node --test slopless/scripts/test/*.test.mjs`, `claude plugin validate .` and `git diff --check` before committing. Build the showcase when its build inputs change.
4. Create an annotated `vX.Y.Z` tag on that verified commit, push the commit and tag without force, and publish a GitHub Release from that exact tag using the changelog entry. Published tags stay fixed; corrections get a new version.
