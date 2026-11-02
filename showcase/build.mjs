// Builds ../docs/index.html (story) and ../docs/explore.html (toolbox): each one self-contained (fonts, GSAP, scripts inlined).
import { readFileSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';
import { KB, GALLERIES, EFFECTS, READING, PROMPTS, REPO } from './src/data.mjs';

const read = (p) => readFileSync(new URL(p, import.meta.url));
const text = (p) => read(p).toString();
const b64 = (p) => read(p).toString('base64');
const fonts = `
@font-face{font-family:"Bricolage Grotesque";font-style:normal;font-weight:300 800;font-stretch:75% 100%;font-display:swap;src:url(data:font/woff2;base64,${b64('./vendor/bricolage.woff2')}) format("woff2")}
@font-face{font-family:"Hanken Grotesk";font-style:normal;font-weight:400 600;font-display:swap;src:url(data:font/woff2;base64,${b64('./vendor/hanken.woff2')}) format("woff2")}`;
const bundle = async (file, extra = {}) => (await build({ entryPoints: [new URL(file, import.meta.url).pathname], bundle: true, minify: true, format: 'iife', write: false, target: 'es2020', logLevel: 'error', ...extra })).outputFiles[0].text;
// tools.js imports the real slop-scan.mjs; its Node-only imports are stubbed because scan() never touches them.
const stubNode = { name: 'stub-node', setup(b) {
  b.onResolve({ filter: /^node:/ }, (a) => ({ path: a.path, namespace: 'stub' }));
  b.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({ contents: 'export const readFileSync=0,readdirSync=0,statSync=0,join=0,extname=0;', loader: 'js' }));
} };
const inline = (js) => `<script>${js.replace(/<\/script/gi, '<\\/script')}</script>`;
const js = {
  SCENE: inline(await bundle('./src/scene.js')),
  UI: inline(await bundle('./src/ui.js')),
  TOOLS: inline(await bundle('./src/tools.js', { plugins: [stubNode], define: { 'process.argv': '[]' }, logLevel: 'silent' })),
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
// Home shows one prompt each for deck, web, app and graphic.
const homePrompts = ['Deck', 'Web', 'App', 'Graphic'].map((g) => row(PROMPTS.find(([n]) => n === g)[1][0])).join('');

const gallery = text('./src/gallery.html');
const pair = (id) => gallery.match(new RegExp(`<figure[^>]*data-pair="${id}"[\\s\\S]*?</figure>`))[0];
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
    'PAIR:land': pair('land').replace('class="pair w8"', 'class="pair full"').replace(/<figcaption>[\s\S]*?<\/figcaption>/, '').replace('value="50"', 'value="35"'),
    PROMPTS: homePrompts,
    FOOTER: footer('<a href="explore.html">Explore the toolbox</a>'),
  }),
  'explore.html': fill(text('./src/explore.html'), {
    HEAD: head, GSAP: js.GSAP, COMMON: js.COMMON, AGENTS: js.AGENTS, UI: js.UI, TOOLS: js.TOOLS,
    GALLERY: gallery, COMPARE: text('./src/compare.html'), KB: kb, PROMPTS: prompts,
    GALLERIES: GALLERIES.map((x) => ext(...x)).join(''), EFFECTS: EFFECTS.map((x) => ext(...x)).join(''), READING: READING.map((x) => ext(...x)).join(''),
    FOOTER: footer('<a href="./">Back to the home page</a>'),
  }),
};
for (const [name, html] of Object.entries(pages)) {
  writeFileSync(new URL(`../docs/${name}`, import.meta.url), html);
  console.log(`docs/${name} ${(html.length / 1024).toFixed(0)} KB`);
}
