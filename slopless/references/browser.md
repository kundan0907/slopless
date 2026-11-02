# Browser and setup

Use the host's available browser tools first, following that host's navigation and ownership rules. Inspect the actual rendered result. No package install is needed when the host can perform the required checks. Never use another user's browser profile or change app dependencies to obtain screenshots.

## Optional screenshot CLI

With Node 20+ and npm, `shoot.mjs` reuses a resolvable Playwright package or automatically provisions pinned Playwright 1.64.1 into `~/.cache/slopless/playwright-1.64.1`. It installs Chromium headless shell only when missing. The script never edits the target project's package files. First provisioning needs network and supported OS libraries; subsequent capture can work offline. `SLOPLESS_CACHE_DIR` changes the runtime cache; Playwright's `PLAYWRIGHT_BROWSERS_PATH` controls its browser cache.

```sh
node <skill>/scripts/shoot.mjs page.html --quick
node <skill>/scripts/shoot.mjs deck.html --deck --quick --steps 4
node <skill>/scripts/shoot.mjs deck.html --deck --all --ready '[data-slopless-ready="true"]'
node <skill>/scripts/shoot.mjs post.html --sizes 1080x1350
node <skill>/scripts/shoot.mjs page.html --reduced --no-install
```

`--quick` uses two web widths or one deck width. `--steps N` means N right-arrow presses, not N slides. `--all` discovers `.slide` elements and each slide's largest `data-b` value; it starts at the first slide and captures each advance. Use explicit navigation for other engines. Do not pass a value to boolean flags such as `--full`; unknown flags and invalid dimensions fail early.

For new deck controllers, set `data-slopless-ready="false"` synchronously before a transition, update `data-slopless-beat="slide:beat"`, and set readiness to `true` only when that state has settled. `--ready` waits for a visible selector. Keep its completion tied to the latest navigation request; stale callbacks cannot mark a newer state ready.

For existing engines without readiness, the fallback waits 1800ms per advance. Pass `--wait` longer than the actual longest transition if necessary. This is timed sampling, not proof of complete beat coverage. Inspect intermediate content states, rapid/reverse navigation and the captures themselves. `capture.json` records each screenshot's size, hash and optional beat identity. The helper clears input focus before advancing and fails if a supplied beat identity does not change; no script can infer arbitrary presenter semantics.

## Failure path

Dependency lookup is bounded to the project, skill and runtime cache. No filesystem-wide search and no replacement harness. A missing browser triggers at most one installation attempt; unrelated launch failures remain failures. Use `--no-install` when downloads are prohibited. Never run system package installers or request elevated access automatically.

If Node/npm/network or OS libraries are unavailable, use the host browser. If neither browser path works, complete the safe source changes and static checks; explicitly report visual verification unavailable. Do not give a visual score or claim smoothness. Missing setup is a verification limit, not a reason to silently pretend the result passed.

Sources: [Playwright browser provisioning](https://playwright.dev/docs/browsers) and [library API](https://playwright.dev/docs/library).
