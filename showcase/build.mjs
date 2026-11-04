// Builds ../docs/index.html (story) and ../docs/explore.html (toolbox): each one self-contained (fonts, GSAP, scripts inlined).
import { readFileSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';
import { KB, GALLERIES, EFFECTS, READING, PROMPTS, START, REPO, SOURCES, JOBS } from './src/data.mjs';
import { getIcon, styleSvg } from '../slopless/scripts/assets.mjs';

const read = (p) => readFileSync(new URL(p, import.meta.url));
const text = (p) => read(p).toString();
const b64 = (p) => read(p).toString('base64');
const fonts = `
@font-face{font-family:"Bricolage Grotesque";font-style:normal;font-weight:300 800;font-stretch:75% 100%;font-display:swap;src:url(data:font/woff2;base64,${b64('./vendor/bricolage.woff2')}) format("woff2")}
@font-face{font-family:"Hanken Grotesk";font-style:normal;font-weight:400 600;font-display:swap;src:url(data:font/woff2;base64,${b64('./vendor/hanken.woff2')}) format("woff2")}`;
const bundle = async (file, extra = {}) => (await build({ entryPoints: [new URL(file, import.meta.url).pathname], bundle: true, minify: true, format: 'iife', write: false, target: 'es2020', logLevel: 'error', ...extra })).outputFiles[0].text;
const inline = (js) => `<script>${js.replace(/<\/script/gi, '<\\/script')}</script>`;
const js = {
  SCENE: inline(await bundle('./src/scene.js')),
  UI: inline(await bundle('./src/ui.js')),
  TOOLS: inline(text('./src/tools.js')),
  MOTION: inline(text('./src/motion.js')),
  COMMON: inline(text('./src/common.js')),
  HOME: inline(text('./src/home.js')),
  AGENTS: inline(text('./src/agents.js')),
  GSAP: inline(text('./vendor/gsap.min.js')),
};
const gsapFull = js.GSAP + '\n' + inline(text('./vendor/ScrollTrigger.min.js'));

const e = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const ext = (n, u, d) => `<li><a href="${e(u)}" target="_blank" rel="noopener">${e(n)}</a><span>${e(d)}</span></li>`;
const kb = KB.map(([g, rows]) => `<div class="kb-group"><h3>${e(g)}</h3>${rows.map(([p, d, w]) => `<div class="kb-row" data-kb><a href="${REPO + p}" target="_blank" rel="noopener">${e(p.replace(/^slopless\//, '').replace(/^references\//, ''))}</a><p>${e(d)}</p><span>${e(w)}</span></div>`).join('')}</div>`).join('');
const row = ([p, n]) => `<div class="pg-row"><div><p class="cp-src">${e(p)}</p><span>${e(n)}</span></div><button class="cp" type="button" aria-label="Copy prompt: ${e(p.slice(0, 40))}">Copy</button></div>`;
const prompts = PROMPTS.map(([g, ps]) => `<div class="pg-group"><h3>${e(g)}</h3><div>${ps.map(row).join('')}</div></div>`).join('');
const homePrompts = START.map(row).join('');

// Icons are fetched once with the skill's own assets.mjs and inlined, so the pages work offline.
const SETS = [
  ['Lucide', 'lucide', 'ISC', ['calendar', 'search', 'bell', 'mail', 'map-pin', 'ticket', 'clock', 'shield-check', 'download']],
  ['Phosphor', 'ph', 'MIT', ['calendar', 'magnifying-glass', 'bell', 'envelope', 'map-pin', 'ticket', 'clock', 'shield-check', 'download-simple']],
  ['Tabler', 'tabler', 'MIT', ['calendar', 'search', 'bell', 'mail', 'map-pin', 'ticket', 'clock', 'shield-check', 'download']],
  ['Heroicons', 'heroicons', 'MIT', ['calendar', 'magnifying-glass', 'bell', 'envelope', 'map-pin', 'ticket', 'clock', 'shield-check', 'arrow-down-tray']],
];
const rawGallery = text('./src/gallery.html');
const galleryIcons = [...new Set([...rawGallery.matchAll(/\{\{icon:([\w-]+:[\w-]+)\}\}/g)].map((m) => m[1]))];
const stripIcons = ['lucide:ticket', 'lucide:train-front', 'lucide:map-pin', 'lucide:calendar', 'lucide:search', 'lucide:bell', 'lucide:mail', 'lucide:download', 'lucide:shield-check', 'lucide:clock'];
const want = [...new Set([...SETS.flatMap(([, p, , n]) => n.map((x) => `${p}:${x}`)), ...galleryIcons, ...stripIcons])];
const svgs = {};
try {
  await Promise.all(want.map(async (id) => { const [p, n] = id.split(':'); svgs[id] = styleSvg(await getIcon(p, n), { size: 24, stroke: 1.5 }).replace('<svg ', '<svg aria-hidden="true" focusable="false" '); }));
} catch (err) {
  console.error(`\nBuild stopped: icons could not be fetched, so the pages would ship with holes.\n${err.message}\nThe build needs network access to api.iconify.design or cdn.jsdelivr.net.`);
  process.exit(1);
}
// Shared status bar and home indicator for the handset mockup: both screens use the same geometry.
const SBAR = `<div class="sbar"><b>9:41</b><span><svg viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" y="0" width="3" height="12" rx=".8"/></svg><svg viewBox="0 0 17 12" aria-hidden="true"><path d="M1 4.2a11 11 0 0 1 15 0M3.6 7a7.2 7.2 0 0 1 9.8 0M6.2 9.8a3.4 3.4 0 0 1 4.6 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="8.5" cy="11" r="1.1"/></svg><svg viewBox="0 0 27 12" aria-hidden="true"><rect x=".5" y=".5" width="22" height="11" rx="3.2" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="19" height="8" rx="2"/><path d="M24 4v4c.8-.3 1.5-1.1 1.5-2S24.8 4.3 24 4z" opacity=".5"/></svg></span></div><i class="home-ind"></i>`;
const gallery = rawGallery.replace(/\{\{sbar\}\}/g, () => SBAR).replace(/\{\{icon:([\w-]+:[\w-]+)\}\}/g, (_, id) => svgs[id]);
const iconGrid = SETS.map(([n, p, lic, names]) => `<div class="asset-card"><header><b>${n}</b><span>${lic}</span></header><div class="icons">${names.map((x) => svgs[`${p}:${x}`]).join('')}</div><p class="cap">Prefix <code>${p}:</code> via assets.mjs</p></div>`).join('');
const devices = `<div class="dev-card"><div class="dev-row"><div class="dev-in"><div class="d-phone"><div>${svgs['lucide:ticket']}</div></div><div class="d-lap"><div>${svgs['lucide:train-front']}</div></div></div></div><div><b>Phone and laptop frames</b><p>A phone and a laptop, drawn in CSS at true relative size. The screens inside are the project's own UI, never a flattened mockup image. assets.md has the frame details.</p></div></div>`;
const sources = SOURCES.map(([g, rows]) => `<div class="src-group"><h3>${e(g)}</h3><div>${rows.map(([n, u, l, d]) => `<div class="src-row"><a href="${e(u)}" target="_blank" rel="noopener">${e(n)}</a><span>${e(l)}</span><span>${e(d)}</span></div>`).join('')}</div></div>`).join('');
const iconStrip = `<div class="icon-strip" aria-hidden="true">${stripIcons.map((id) => svgs[id]).join('')}</div><p class="cap icon-cap">One family (Lucide, ISC licence), one stroke weight, fetched with assets.mjs and inlined.</p>`;

// "What your agent reads": excerpts come from the real files, so they cannot drift.
const ROOT = new URL('../', import.meta.url);
const excerpt = (path, start, max) => {
  const all = readFileSync(new URL(path, ROOT), 'utf8').split('\n');
  const isScript = path.endsWith('.mjs');
  let from = 0;
  if (start) from = all.findIndex((l) => new RegExp(start).test(l));
  else if (isScript) from = all.findIndex((l) => l.startsWith('//'));
  else from = all.findIndex((l, i) => i > 0 && l.trim() && !l.startsWith('# '));
  if (from < 0) throw new Error(`No excerpt start in ${path}`);
  let lines = all.slice(from, from + max);
  if (isScript) { const end = lines.findIndex((l) => !l.startsWith('//')); if (end >= 0) lines = lines.slice(0, end); }
  const full = lines.map((l) => (l.length > 230 ? l.slice(0, 227) + '...' : l));
  return { text: full.join('\n'), range: `lines ${from + 1} to ${from + lines.length}` };
};
const STEPS = [['Router', 'Router', 'Starts every run: classifies the job and names the files to load.'], ['Loaded for this job', 'Surface|Reference', 'Only the small files this job needs, read right before the step that uses them.'], ['Scripts it runs', 'Script', 'Run, not read: checks, screenshots and asset fetches.']];
const card = ([p, , start, max]) => { const x = excerpt(p, start, max); return `<div class="reads-card"><header><a href="${REPO + p}" target="_blank" rel="noopener">${e(p.replace(/^slopless\//, ''))}</a><span>${x.range}</span></header><pre>${e(x.text)}</pre></div>`; };
const readsTabs = JOBS.map(([id, n], i) => `<button role="tab" type="button" data-job="${id}" id="job-${id}" aria-selected="${i === 0}" aria-controls="reads-${id}">${e(n)}</button>`).join('');
const reads = JOBS.map(([id, n, files]) => `<div class="reads-panel" role="tabpanel" id="reads-${id}" aria-labelledby="job-${id}" data-job="${id}" hidden>${STEPS.map(([h, roles, d], k) => `<div class="reads-step"><div><span class="n">Step ${k + 1}</span><h3>${h}</h3><p class="cap">${d}</p></div><div class="reads-grid">${files.filter((f) => roles.split('|').includes(f[1])).map(card).join('')}</div></div>`).join('')}</div>`).join('');

const pair = (id) => gallery.match(new RegExp(`<figure[^>]*data-pair="${id}"[\\s\\S]*?</figure>`))[0];
// The hero lens reuses the landing pair's two layers (after first, before second) without its handle, tags or input.
const lensLayers = (() => { const p = pair('land'); return p.slice(p.indexOf('>', p.indexOf('<div class="cmp')) + 1, p.indexOf('<span class="tag l">')); })();
const footer = (links) => `<footer>
  <div class="credits">
    <div><b>Standing on</b>Ideas adapted from Impeccable, taste-skill and UI/UX Pro Max, credited in the repository.</div>
    <div><b>Made with</b>Three.js, GSAP and ScrollTrigger, Bricolage Grotesque and Hanken Grotesk.</div>
    <div><b>This page</b>Built with slopless and checked by its own scanner. One HTML file, no network requests. ${links}</div>
  </div>
  <p class="bigname" aria-hidden="true">slopless</p>
</footer>`;
const head = `<script>
  // Restore the visitor's palette before first paint.
  try { const p = localStorage.getItem('slopless:palette'); if (p) document.documentElement.dataset.palette = p; } catch {}
</script>
<style>
${text('./src/site.css').replace('/*FONTS*/', () => fonts)}
</style>`;

// Function replacers: minified code contains `$&`-style sequences that string replacers would expand.
const fill = (src, map) => Object.entries(map).reduce((h, [k, v]) => h.replace(`<!--${k}-->`, () => v), src);
const pages = {
  'index.html': fill(text('./src/home.html'), {
    HEAD: head, GSAP: gsapFull, SCENE: js.SCENE, COMMON: js.COMMON, HOME: js.HOME, UI: js.UI,
    LENS: lensLayers, GALLERY: gallery,
    PROMPTS: homePrompts, MOTION: js.MOTION, ICONSTRIP: iconStrip,
    FOOTER: footer('<a href="explore.html">Open the explore page</a>'),
  }),
  'explore.html': fill(text('./src/explore.html'), {
    HEAD: head, GSAP: js.GSAP, MOTION: js.MOTION, COMMON: js.COMMON, AGENTS: js.AGENTS, UI: js.UI, TOOLS: js.TOOLS,
    GALLERY: gallery, READSTABS: readsTabs, READS: reads, ICONGRID: iconGrid, DEVICES: devices, SOURCES: sources, COMPARE: text('./src/compare.html'), KB: kb, PROMPTS: prompts,
    GALLERIES: GALLERIES.map((x) => ext(...x)).join(''), EFFECTS: EFFECTS.map((x) => ext(...x)).join(''), READING: READING.map((x) => ext(...x)).join(''),
    FOOTER: footer('<a href="./">Back to the home page</a>'),
  }),
};
for (const [name, html] of Object.entries(pages)) {
  writeFileSync(new URL(`../docs/${name}`, import.meta.url), html);
  console.log(`docs/${name} ${(html.length / 1024).toFixed(0)} KB`);
}
