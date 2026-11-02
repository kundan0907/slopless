#!/usr/bin/env node
// Fetch real icons, fonts and photos instead of drawing or hotlinking them. Node 18+, no dependencies.
//   icon  <prefix:name> [--size 24] [--stroke 1.5] [--out file]    one SVG from Iconify (lucide:arrow-right)
//   icons <prefix> <a,b,c> [--size 24] [--stroke 1.5] --out dir    several SVGs, one file each
//   search <query> [--prefix lucide]                               find icon names
//   font  <Family> [--weights 400..700|400,700] --out dir [--inline]   WOFF2 (latin) + an @font-face block
//   photo <query>                                                  Openverse images with a commercial-use licence
// Icons: the Iconify API first, then the same data on jsDelivr when the API is blocked.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { isMain } from './cli.mjs';

const ICONIFY = ['https://api.iconify.design'];
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

/* ---------- pure helpers (tested) ---------- */
export function parseArgs(argv) {
  const _ = [], flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { _.push(a); continue; }
    const k = a.slice(2), next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) flags[k] = true; else { flags[k] = next; i++; }
  }
  return { _, flags };
}

export function splitIconName(s) {
  const m = /^([a-z0-9]+(?:-[a-z0-9]+)*):([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(s || '');
  if (!m) throw new Error(`Icon must look like prefix:name, for example lucide:arrow-right (got "${s ?? ''}")`);
  return { prefix: m[1], name: m[2] };
}

// Sets width/height on the root <svg> and, when given, every stroke-width.
export function styleSvg(svg, { size, stroke } = {}) {
  let out = svg.trim();
  if (size) out = out.replace(/<svg\b[^>]*>/, (tag) => tag.replace(/\s(width|height)="[^"]*"/g, '').replace('<svg', `<svg width="${size}" height="${size}"`));
  if (stroke) out = out.replace(/stroke-width="[^"]*"/g, `stroke-width="${stroke}"`);
  return out;
}

// Iconify JSON icon data -> standalone SVG.
export function svgFromData(json, name) {
  let icon = json.icons?.[name];
  if (!icon && json.aliases?.[name]) {
    const a = json.aliases[name];
    icon = { ...json.icons?.[a.parent], ...a };
  }
  if (!icon) throw new Error(`No icon "${name}" in ${json.prefix}`);
  const w = icon.width ?? json.width ?? 16, h = icon.height ?? json.height ?? 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${icon.body}</svg>`;
}

// Google Fonts CSS2 -> the latin face of each weight.
export function parseFontCss(css) {
  const faces = [];
  const re = /\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g;
  for (let m; (m = re.exec(css));) {
    const get = (p) => new RegExp(`${p}:\\s*([^;]+);`).exec(m[2])?.[1].trim();
    const url = /url\(([^)]+)\)/.exec(m[2])?.[1].replace(/["']/g, '');
    faces.push({ subset: m[1], family: get('font-family')?.replace(/["']/g, ''), style: get('font-style'), weight: get('font-weight'), range: get('unicode-range'), url });
  }
  return faces.filter((f) => f.subset === 'latin');
}

export function fontFaceCss({ family, style, weight, range }, src) {
  return `@font-face{font-family:"${family}";font-style:${style};font-weight:${weight};font-display:swap;src:url(${src}) format("woff2");unicode-range:${range}}`;
}

export function fontUrl(family, weights) {
  const w = weights ? `:wght@${String(weights).includes('..') ? weights : String(weights).split(',').join(';')}` : '';
  return `https://fonts.googleapis.com/css2?family=${family.trim().replace(/\s+/g, '+')}${w}&display=swap`;
}

/* ---------- network ---------- */
async function get(url, { json = false, bin = false, headers = {} } = {}) {
  let res;
  try { res = await fetch(url, { headers: { 'user-agent': UA, ...headers }, signal: AbortSignal.timeout(15000) }); }
  catch (e) { throw new Error(`Network error for ${new URL(url).host}: ${e.cause?.code || e.message}`); }
  if (!res.ok) throw new Error(`${new URL(url).host} answered ${res.status} ${res.statusText}`);
  return bin ? Buffer.from(await res.arrayBuffer()) : json ? res.json() : res.text();
}

const dataCache = new Map();
export async function getIcon(prefix, name) {
  const errs = [];
  for (const host of ICONIFY) {
    try {
      const svg = await get(`${host}/${prefix}/${name}.svg`);
      if (/^\s*<svg\b/.test(svg)) return svg; // a proxy block page is HTML, not SVG
      errs.push(`${new URL(host).host} returned a non-SVG page`);
    } catch (e) { errs.push(e.message); }
  }
  try {
    if (!dataCache.has(prefix)) dataCache.set(prefix, get(`https://cdn.jsdelivr.net/npm/@iconify-json/${prefix}/icons.json`, { json: true }));
    return svgFromData(await dataCache.get(prefix), name);
  } catch (e) { errs.push(e.message); }
  throw new Error(`Could not fetch ${prefix}:${name}. ${errs.join('; ')}`);
}

async function searchIcons(query, prefix) {
  const q = new URLSearchParams({ query, limit: '48', ...(prefix ? { prefix } : {}) });
  try {
    const j = await get(`${ICONIFY[0]}/search?${q}`, { json: true });
    if (j.icons) return j.icons;
  } catch {}
  if (!prefix) throw new Error('Iconify search is unreachable; retry with --prefix so the fallback can search one set');
  const data = await get(`https://cdn.jsdelivr.net/npm/@iconify-json/${prefix}/icons.json`, { json: true });
  return Object.keys({ ...data.icons, ...data.aliases }).filter((n) => n.includes(query.toLowerCase().replace(/\s+/g, '-'))).slice(0, 48).map((n) => `${prefix}:${n}`);
}

async function fetchFont(family, weights, dir, inline) {
  const css = await get(fontUrl(family, weights));
  const faces = parseFontCss(css);
  if (!faces.length) throw new Error(`No latin faces found for "${family}". Check the family name and weights.`);
  if (dir) mkdirSync(dir, { recursive: true });
  const blocks = [];
  for (const f of faces) {
    const bin = await get(f.url, { bin: true });
    const file = `${family.replace(/\s+/g, '-')}-${f.style}-${f.weight.replace(/\s+/g, '-')}.woff2`;
    if (dir) writeFileSync(join(dir, file), bin);
    blocks.push(fontFaceCss(f, inline ? `data:font/woff2;base64,${bin.toString('base64')}` : `./${file}`));
  }
  return blocks;
}

async function photos(query) {
  const q = new URLSearchParams({ q: query, license: 'cc0,pdm,by,by-sa', page_size: '8' });
  const j = await get(`https://api.openverse.org/v1/images/?${q}`, { json: true });
  return (j.results || []).map((r) => `${r.title || 'Untitled'}\n  by ${r.creator || 'unknown'}  |  ${String(r.license).toUpperCase()} ${r.license_version || ''}  |  ${r.foreign_landing_url}\n  file: ${r.url}\n  credit: ${r.attribution || ''}`);
}

/* ---------- cli ---------- */
const USAGE = `usage:
  assets.mjs icon <prefix:name> [--size 24] [--stroke 1.5] [--out file]
  assets.mjs icons <prefix> <name,name,...> --out dir [--size 24] [--stroke 1.5]
  assets.mjs search <query> [--prefix lucide]
  assets.mjs font <Family> [--weights 400..700] --out dir [--inline]
  assets.mjs photo <query>`;

async function main(argv) {
  const { _: [cmd, ...rest], flags } = parseArgs(argv);
  const style = { size: flags.size, stroke: flags.stroke };
  if (cmd === 'icon') {
    const { prefix, name } = splitIconName(rest[0]);
    const svg = styleSvg(await getIcon(prefix, name), style);
    if (flags.out && flags.out !== true) { writeFileSync(flags.out, svg + '\n'); console.log(`wrote ${flags.out}`); } else console.log(svg);
  } else if (cmd === 'icons') {
    const [prefix, names] = rest;
    if (!prefix || !names || !flags.out || flags.out === true) throw new Error('icons needs <prefix> <a,b,c> --out dir');
    mkdirSync(flags.out, { recursive: true });
    for (const n of names.split(',').map((s) => s.trim()).filter(Boolean)) {
      writeFileSync(join(flags.out, `${n}.svg`), styleSvg(await getIcon(prefix, n), style) + '\n');
      console.log(`wrote ${join(flags.out, n)}.svg`);
    }
  } else if (cmd === 'search') {
    if (!rest.length) throw new Error('search needs a query');
    console.log((await searchIcons(rest.join(' '), flags.prefix)).join('\n') || 'no matches');
  } else if (cmd === 'font') {
    if (!rest.length) throw new Error('font needs a family name');
    console.log((await fetchFont(rest.join(' '), flags.weights === true ? '' : flags.weights, flags.out === true ? '' : flags.out, !!flags.inline)).join('\n'));
  } else if (cmd === 'photo') {
    if (!rest.length) throw new Error('photo needs a query');
    console.log((await photos(rest.join(' '))).join('\n\n') || 'no matches');
    console.error('\nCredit the creator where the licence asks for it. Download the file and inline it; never hotlink.');
  } else { console.error(USAGE); process.exit(cmd ? 2 : 0); }
}

if (isMain(import.meta.url)) main(process.argv.slice(2)).catch((e) => { console.error(`assets: ${e.message}`); process.exit(1); });
