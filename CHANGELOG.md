# Changelog

Versions cover the skill instructions and bundled tools together. Earlier commits were unversioned; this history starts with the first tagged release.

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
