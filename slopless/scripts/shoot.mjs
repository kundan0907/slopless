#!/usr/bin/env node
// Screenshots for visual review. Needs Playwright (npm i -D playwright && npx playwright install chromium).
// Usage: node shoot.mjs <file|url> [--out dir] [--sizes 1440x900,390x844] [--deck] [--steps N]
//        [--full] [--wait ms] [--scheme dark|light] [--reduced] [--scroll N]
import { createRequire } from 'node:module';
import { mkdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

function loadPlaywright() {
  const roots = [process.cwd(), import.meta.dirname];
  try { roots.push(execSync('npm root -g', { encoding: 'utf8' }).trim()); } catch {}
  for (const root of roots) {
    try { return createRequire(join(root, 'noop.js'))('playwright'); } catch {}
  }
  console.error('Playwright not found. Run: npm i -D playwright && npx playwright install chromium\nOr take screenshots with your browser tool and review them the same way.');
  process.exit(2);
}

const args = process.argv.slice(2);
const opt = (name, dflt) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : dflt; };
const flag = (name) => args.includes(`--${name}`);
const VALUE_OPTS = new Set(['--out', '--sizes', '--steps', '--wait', '--scheme', '--scroll']);
const target = args.find((a, i) => !a.startsWith('--') && !VALUE_OPTS.has(args[i - 1]));
if (!target) { console.error('usage: shoot.mjs <file|url> [--deck] [--steps N] [--sizes WxH,...] [--out dir]'); process.exit(2); }

const deck = flag('deck');
const sizes = (opt('sizes', deck ? '1920x1080,1440x810' : '1440x900,768x1024,390x844')).split(',').map((s) => s.split('x').map(Number));
const steps = Number(opt('steps', 0));
const scrolls = Number(opt('scroll', 0));
const wait = Number(opt('wait', 900));
const out = resolve(opt('out', '.slopless/shots'));
const url = /^https?:|^file:/.test(target) ? target : pathToFileURL(resolve(target)).href;
if (!/^https?:/.test(url) && !existsSync(new URL(url))) { console.error(`not found: ${target}`); process.exit(2); }
mkdirSync(out, { recursive: true });

const { chromium } = loadPlaywright();
const browser = await chromium.launch();
const shots = [];
for (const [w, h] of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, colorScheme: opt('scheme', 'dark'), reducedMotion: flag('reduced') ? 'reduce' : 'no-preference' });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(wait);
  const snap = async (name) => { const p = join(out, `${w}x${h}-${name}.png`); await page.screenshot({ path: p, fullPage: flag('full') && !deck }); shots.push(p); };
  await snap('00');
  for (let i = 1; i <= steps; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(wait); await snap(String(i).padStart(2, '0')); }
  for (let i = 1; i <= scrolls; i++) { await page.mouse.wheel(0, h * 0.9); await page.waitForTimeout(wait); await snap(`scroll-${String(i).padStart(2, '0')}`); }
  if (errors.length) console.log(`console errors at ${w}x${h}:\n  ${errors.join('\n  ')}`);
  await page.close();
}
await browser.close();
console.log(shots.join('\n'));
