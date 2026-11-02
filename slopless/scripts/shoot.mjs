#!/usr/bin/env node
// Screenshots for visual review. Reuses Playwright or provisions a pinned runtime in a user cache.
// Usage: node shoot.mjs <file|url> [--out dir] [--sizes 1440x900,390x844] [--deck] [--steps N]
//        [--full] [--wait ms] [--scheme dark|light] [--reduced] [--scroll N]
//        [--quick] [--all] [--ready selector] [--no-install]
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { isMain } from './cli.mjs';
import { loadPlaywright, launchBrowser } from './browser.mjs';

export function parseOptions(args) {
  const values = new Set(['out', 'sizes', 'steps', 'wait', 'scheme', 'scroll', 'ready']);
  const flags = new Set(['deck', 'full', 'reduced', 'quick', 'all', 'no-install']);
  const opt = {}, targets = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (!a.startsWith('--')) { targets.push(a); continue; }
    const key = a.slice(2);
    if (flags.has(key)) { opt[key] = true; continue; }
    if (!values.has(key)) throw new Error(`Unknown option ${a}`);
    if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`Invalid ${a}: value required`);
    opt[key] = args[++i];
  }
  if (targets.length !== 1) throw new Error('Unexpected arguments; supply one file or URL. Boolean flags take no value.');
  const sizes = (opt.sizes || (opt.deck ? (opt.quick ? '1440x810' : '1920x1080,1440x810') : (opt.quick ? '1440x900,390x844' : '1440x900,768x1024,390x844'))).split(',');
  if (sizes.some((s) => !/^[1-9]\d*x[1-9]\d*$/.test(s) || s.split('x').some((n) => +n > 10000))) throw new Error('Invalid --sizes: use widths and heights from 1 to 10000, such as 1080x1350');
  for (const key of ['steps', 'scroll', 'wait']) {
    if (opt[key] !== undefined && (!/^\d+$/.test(opt[key]) || +opt[key] > (key === 'wait' ? 30000 : 500))) throw new Error(`Invalid --${key}`);
  }
  if (opt.scheme && !['dark', 'light'].includes(opt.scheme)) throw new Error('Invalid --scheme: dark or light');
  if (opt.all && opt.steps !== undefined) throw new Error('Invalid combination: use --all or --steps');
  return { ...opt, target: targets[0], sizes: sizes.map((s) => s.split('x').map(Number)), wait: +(opt.wait ?? 1800), steps: +(opt.steps ?? 0), scroll: +(opt.scroll ?? 0) };
}

// Explicit readiness wins; arbitrary existing decks use a conservative, disclosed timed fallback.
async function settle(page, opt) {
  await page.evaluate(() => document.fonts.ready);
  if (opt.ready) await page.locator(opt.ready).waitFor({ state: 'visible', timeout: 10000 });
  else await page.waitForTimeout(opt.wait);
}

export async function capture(opt) {
  const url = /^https?:|^file:/.test(opt.target) ? new URL(opt.target) : pathToFileURL(resolve(opt.target));
  if (!['http:', 'https:', 'file:'].includes(url.protocol)) throw new Error('Only file and HTTP(S) targets are supported');
  if (url.protocol === 'file:' && !existsSync(fileURLToPath(url))) throw new Error(`Not found: ${opt.target}`);
  const out = resolve(opt.out || '.slopless/shots');
  const runtime = loadPlaywright({ install: !opt['no-install'] });
  const browser = await launchBrowser(runtime, { install: !opt['no-install'] });
  const report = { target: url.href, readiness: opt.ready ? `selector: ${opt.ready}` : `timed fallback: ${opt.wait}ms; beat coverage requires visual review`, captures: [] };
  mkdirSync(out, { recursive: true });
  try {
    for (const [width, height] of opt.sizes) {
      const page = await browser.newPage({ viewport: { width, height }, colorScheme: opt.scheme || 'dark', reducedMotion: opt.reduced ? 'reduce' : 'no-preference' });
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      await page.goto(url.href, { waitUntil: 'load', timeout: 30000 });
      await settle(page, opt);
      let previousBeat = null;
      const snap = async (name, advanced = false) => {
        const path = join(out, `${width}x${height}-${name}.png`);
        await page.screenshot({ path, fullPage: !!opt.full && !opt.deck, animations: opt.reduced ? 'disabled' : 'allow' });
        const state = await page.evaluate(() => ({ hash: location.hash, beat: document.querySelector('[data-slopless-beat]')?.getAttribute('data-slopless-beat') ?? null }));
        if (advanced && state.beat !== null && state.beat === previousBeat) throw new Error(`Navigation did not advance beat ${state.beat}; capture coverage is incomplete`);
        previousBeat = state.beat;
        report.captures.push({ path, width, height, ...state }); console.log(path);
      };
      let steps = opt.steps;
      if (opt.all) {
        steps = await page.evaluate(() => {
          const slides = [...document.querySelectorAll('.slide')];
          return slides.length ? slides.reduce((n, s) => n + Math.max(0, ...[...s.querySelectorAll('[data-b]')].map((e) => +e.dataset.b || 0)) + 1, 0) - 1 : -1;
        });
        if (steps < 0 || steps > 500 || (url.hash && url.hash !== '#1')) throw new Error('--all needs a .slide deck starting at its first slide, with at most 500 advances; otherwise use --steps');
      }
      await snap('00');
      for (let i = 1; i <= steps; i++) {
        await page.evaluate(() => document.activeElement?.blur());
        await page.keyboard.press('ArrowRight'); await settle(page, opt);
        await snap(String(i).padStart(2, '0'), true);
      }
      for (let i = 1; i <= opt.scroll; i++) { await page.mouse.wheel(0, height * 0.9); await settle(page, opt); await snap(`scroll-${i}`); }
      if (errors.length) throw new Error(`Page errors at ${width}x${height}: ${errors.join('; ')}`);
      await page.close();
    }
    writeFileSync(join(out, 'capture.json'), JSON.stringify(report, null, 2) + '\n');
    console.error(report.readiness);
    return report;
  } finally { await browser.close(); }
}

if (isMain(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length === 1 && args[0] === '--help') console.log('usage: shoot.mjs <file|url> [--quick] [--deck] [--all | --steps N] [--ready selector] [--sizes WxH,...] [--out dir] [--wait ms] [--scheme dark|light] [--reduced] [--full] [--scroll N] [--no-install]');
    else await capture(parseOptions(args));
  }
  catch (e) { console.error(`shoot: ${e.message}`); process.exitCode = 2; }
}
