#!/usr/bin/env node
// slop-scan: static scan for generated-design tells. Node 18+, no dependencies.
// Usage: node slop-scan.mjs <file|dir>... [--allow rule,rule] [--json]
// Wrap deliberate bad examples in comments containing slopless-ignore-start / slopless-ignore-end.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { isMain } from './cli.mjs';

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
const blank = (m) => m.replace(/[^\n]+/g, ' '); // drop the text, keep its line breaks so findings can cite a line
function split(src, ext) {
  src = src.replace(/slopless-ignore-start[\s\S]*?slopless-ignore-end/g, blank); // deliberate "before" examples
  src = src.replace(/data:[^"')\s]{80,}/g, 'data:…'); // keep authored content even when its HTML is minified
  if (ext === '.css' || ext === '.scss') return { css: src, text: '' };
  if (ext === '.md' || ext === '.mdx') return { css: '', text: src.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '') };
  if (ext === '.html' || ext === '.htm') {
    src = src.replace(/<(script|pre|code)\b[^>]*>[\s\S]*?<\/\1>/gi, blank);
    let at = 0;
    const css = [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>|\bstyle=(?:"([^"]*)"|'([^']*)')/dgi)].map((m) => {
      const [from, to] = m.indices[1] || m.indices[2] || m.indices[3];
      const pad = src.slice(at, from).replace(/[^\n]+/g, ''); at = to;
      return pad + src.slice(from, to);
    }).join(';');
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
  const add = (level, rule, msg, line) => out.push(line ? { level, rule, msg, line } : { level, rule, msg });
  const lineAt = (s, i) => s.slice(0, i).split('\n').length;

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
  // Motion candidates need rendered confirmation; delays are not animation duration.
  const motionCss = css.replace(/\/\*[\s\S]*?\*\//g, blank);
  const declarations = motionCss.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '""').replace(/\/\/[^\n]*/g, '');
  const motionLevel = ['.html', '.htm', '.css', '.scss'].includes(ext) ? 'FAIL' : 'WARN';
  // A token is judged only in a style source, when every definition there is a literal time; the longest one counts.
  const tokens = {}, ms = (v) => parseFloat(v) * (/ms$/i.test(v) ? 1 : 1000);
  if (motionLevel === 'FAIL') for (const d of declarations.matchAll(/(?<![\w-])(--[\w-]+)\s*:\s*([^;{}]+)/g)) (tokens[d[1]] ??= []).push(d[2].trim());
  const literal = (whole, name) => (tokens[name]?.every((v) => /^(?:\d*\.)?\d+m?s$/i.test(v)) ? tokens[name].reduce((a, b) => (ms(b) > ms(a) ? b : a)) : whole);
  for (const m of declarations.matchAll(/(?<![\w-])(transition(?:-duration)?|animation(?:-duration)?)\s*:\s*([^;{}]+)/gi)) {
    const durationOnly = m[1].endsWith('-duration'), line = lineAt(declarations, m.index);
    for (const raw of m[2].split(/,(?![^()]*\))/)) {
      const part = raw.replace(/var\(\s*(--[\w-]+)\s*\)/g, literal);
      const times = [...part.matchAll(/(?<![\w.-])((?:\d*\.)?\d+)(ms|s)\b/gi)];
      // A literal time before any var()/calc() is the duration; the function after it is easing or delay.
      const fn = part.search(/\b(?:var|calc|env)\(/i);
      if (fn >= 0 && (durationOnly || !times.length || fn < times[0].index)) { add('WARN', 'motion-unresolved', `measure computed duration: ${part.trim()}`, line); continue; }
      const durations = durationOnly ? times : times.slice(0, 1);
      if (durations.some((t) => Number(t[1]) * (t[2].toLowerCase() === 's' ? 1000 : 1) >= 300)) add(motionLevel, 'motion-duration', `${m[1]} must be under 300ms: ${raw.trim()}${part === raw ? '' : ` (resolved: ${part.trim()})`}`, line);
    }
  }
  for (const m of motionCss.matchAll(/offset-path\s*:\s*path\(\s*["']([^"']*)["']/gi)) {
    if (/[lhv]/i.test(m[1]) && !/[cqast]/i.test(m[1])) add(motionLevel, 'motion-straight-path', 'authored travel uses only straight path segments; use an arc', lineAt(motionCss, m.index));
  }
  return out;
}

function walk(p, files) {
  const st = statSync(p);
  if (st.isDirectory()) { for (const f of readdirSync(p)) if (!SKIP_DIRS.has(f)) walk(join(p, f), files); }
  else if (EXT.has(extname(p).toLowerCase())) files.push(p);
  return files;
}

if (isMain(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    const allowIdx = args.indexOf('--allow');
    if (allowIdx >= 0 && (!args[allowIdx + 1] || args[allowIdx + 1].startsWith('--'))) throw new Error('--allow needs comma-separated rule names');
    const allow = new Set(allowIdx >= 0 ? args.splice(allowIdx, 2)[1].split(',') : []);
    if (args.some((a) => a.startsWith('--') && a !== '--json')) throw new Error('Unknown option; use --allow or --json');
    const json = args.includes('--json');
    const targets = args.filter((a) => !a.startsWith('--'));
    if (!targets.length) { console.error('usage: slop-scan.mjs <file|dir>... [--allow rule,rule] [--json]'); process.exit(2); }
    const results = targets.flatMap((t) => walk(t, [])).map((f) => ({ file: f, findings: scan(readFileSync(f, 'utf8'), extname(f).toLowerCase()).filter((x) => !allow.has(x.rule)) }));
    if (!results.length) throw new Error('No supported files found in the supplied targets');
    const fails = results.reduce((n, r) => n + r.findings.filter((x) => x.level === 'FAIL').length, 0);
    if (json) console.log(JSON.stringify(results, null, 2));
    else {
      for (const r of results) for (const x of r.findings) console.log(`${x.level.padEnd(4)} ${r.file}${x.line ? `:${x.line}` : ''}  [${x.rule}] ${x.msg}`);
      const warns = results.reduce((n, r) => n + r.findings.filter((x) => x.level === 'WARN').length, 0);
      console.log(`\n${results.length} file(s): ${fails} FAIL, ${warns} WARN — visual review still required`);
    }
    process.exit(fails ? 1 : 0);
  } catch (e) { console.error(`slop-scan: ${e.message}`); process.exitCode = 2; }
}
