#!/usr/bin/env node
// slop-scan: static scan for generated-design tells. Node 18+, no dependencies.
// Usage: node slop-scan.mjs <file|dir>... [--allow rule,rule] [--json]
// Wrap deliberate bad examples in comments containing slopless-ignore-start / slopless-ignore-end.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const EXT = new Set(['.html', '.htm', '.css', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.md', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.slopless', 'vendor']);

const BANNED_WORDS = ['seamless', 'seamlessly', 'effortless', 'effortlessly', 'empower', 'unlock', 'elevate', 'leverage', 'supercharge', 'streamline', 'cutting-edge', 'next-gen', 'revolutionary', 'game-changing', 'game-changer', 'ai-powered', 'all-in-one', 'at a glance', 'delve', 'tapestry', 'best-in-class', 'world-class', 'unleash'];
const WEAK_CTAS = ['get started', 'learn more'];
const DEFAULT_FONTS = /font-family\s*:\s*["']?(Inter|Roboto|Open Sans|Lato|Poppins|Montserrat)\b/gi;
const EMOJI = /\p{Extended_Pictographic}/gu;

function hueSat(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3 || h.length === 4) h = [...h.slice(0, 3)].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  if (!d) return { hue: 0, sat: 0 };
  const hue = max === r ? 60 * (((g - b) / d) % 6) : max === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4);
  return { hue: (hue + 360) % 360, sat: d / (1 - Math.abs(max + min - 1)) };
}
const isViolet = (hex) => { const { hue, sat } = hueSat(hex); return hue >= 245 && hue <= 300 && sat > 0.35; };

// Separate styling from visible text so copy rules don't fire on CSS and vice versa.
function split(src, ext) {
  src = src.replace(/slopless-ignore-start[\s\S]*?slopless-ignore-end/g, ' '); // deliberate "before" examples
  src = src.replace(/data:[^"')\s]{80,}/g, 'data:…').split('\n').filter((l) => l.length < 2000).join('\n'); // drop inlined assets and minified libs
  if (ext === '.css' || ext === '.scss') return { css: src, text: '' };
  if (ext === '.md' || ext === '.mdx') return { css: '', text: src.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '') };
  if (ext === '.html' || ext === '.htm') {
    const css = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>|style="([^"]*)"/gi)].map((m) => m[1] || m[2]).join('\n');
    const text = src.replace(/<(script|style|pre|code)[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');
    return { css, text };
  }
  return { css: src, text: src.replace(/^\s*import .*$/gm, '') };
}

const count = (re, s) => (s.match(re) || []).length;

export function scan(src, ext) {
  const { css, text } = split(src, ext);
  const lower = text.toLowerCase();
  const out = [];
  const add = (level, rule, msg) => out.push({ level, rule, msg });

  const grads = css.match(/(linear|radial|conic)-gradient\([^;{}]*\)/gi) || [];
  const violet = grads.filter((g) => (g.match(/#[0-9a-f]{3,8}\b/gi) || []).some(isViolet)).length + count(/\b(from|via|to)-(purple|violet|indigo|fuchsia)-\d{2,3}\b/g, css);
  if (violet) add('FAIL', 'violet-gradient', `${violet} violet/indigo gradient(s)`);
  if (/background-clip\s*:\s*text|bg-clip-text/i.test(css)) add('FAIL', 'gradient-text', 'gradient-filled text');
  const emoji = count(EMOJI, text.replace(/[©®™]/g, ''));
  if (emoji) add('FAIL', 'emoji', `${emoji} emoji in visible text (use drawn icons or words)`);
  const words = BANNED_WORDS.filter((w) => new RegExp(`\\b${w}\\b`).test(lower));
  if (words.length) add('FAIL', 'copy', `stock words: ${words.join(', ')}`);
  if (/lorem ipsum/.test(lower)) add('FAIL', 'lorem', 'lorem ipsum');

  const fonts = [...css.matchAll(DEFAULT_FONTS)].map((m) => m[1]);
  if (fonts.length) add('WARN', 'default-font', `training-data default face: ${[...new Set(fonts)].join(', ')}`);
  const eyebrows = [...css.matchAll(/\{[^}]*\}/g)].filter((b) => /text-transform\s*:\s*uppercase/i.test(b[0]) && /letter-spacing\s*:\s*0?\.(0[8-9]|[1-9])/i.test(b[0])).length + count(/\buppercase\b[^"'`]*\btracking-(wider|widest)\b/g, css);
  if (eyebrows) add('WARN', 'eyebrow', `${eyebrows} tiny tracked-uppercase label style(s)`);
  const glows = count(/box-shadow\s*:\s*0(px)?\s+0(px)?\s+\d+px/gi, css);
  if (glows) add('WARN', 'glow', `${glows} zero-offset glow shadow(s)`);
  const blur = count(/backdrop-filter\s*:/gi, css);
  if (blur > 6) add('WARN', 'glass-everywhere', `${blur} backdrop-filter declarations; keep glass to a few surfaces`);
  if (/ease\s*:\s*["']?(bounce|elastic)|cubic-bezier\([^)]*,\s*-?(1\.[3-9]|[2-9])/i.test(css)) add('WARN', 'bounce', 'bounce/elastic easing');
  const ctas = WEAK_CTAS.filter((w) => lower.includes(w));
  if (ctas.length) add('WARN', 'weak-cta', `generic action label: ${ctas.join(', ')}`);
  const dashes = count(/—/g, text);
  if (dashes > 6) add('WARN', 'em-dash', `${dashes} em dashes`);
  return out;
}

function walk(p, files) {
  const st = statSync(p);
  if (st.isDirectory()) { for (const f of readdirSync(p)) if (!SKIP_DIRS.has(f)) walk(join(p, f), files); }
  else if (EXT.has(extname(p).toLowerCase())) files.push(p);
  return files;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const allowIdx = args.indexOf('--allow');
  const allow = new Set(allowIdx >= 0 ? args.splice(allowIdx, 2)[1].split(',') : []);
  const json = args.includes('--json');
  const targets = args.filter((a) => !a.startsWith('--'));
  if (!targets.length) { console.error('usage: slop-scan.mjs <file|dir>... [--allow rule,rule] [--json]'); process.exit(2); }
  const results = targets.flatMap((t) => walk(t, [])).map((f) => ({ file: f, findings: scan(readFileSync(f, 'utf8'), extname(f).toLowerCase()).filter((x) => !allow.has(x.rule)) }));
  const fails = results.reduce((n, r) => n + r.findings.filter((x) => x.level === 'FAIL').length, 0);
  if (json) console.log(JSON.stringify(results, null, 2));
  else {
    for (const r of results) for (const x of r.findings) console.log(`${x.level.padEnd(4)} ${r.file}  [${x.rule}] ${x.msg}`);
    const warns = results.reduce((n, r) => n + r.findings.filter((x) => x.level === 'WARN').length, 0);
    console.log(`\n${results.length} file(s): ${fails} FAIL, ${warns} WARN${fails ? '' : ' — clean of banned tells'}`);
  }
  process.exit(fails ? 1 : 0);
}
