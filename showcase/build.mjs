// Builds ../docs/index.html: one self-contained file (fonts, GSAP, Three.js scene, scanner bundle inlined).
import { readFileSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';
import { KB, GALLERIES, EFFECTS, READING, PROMPTS, REPO } from './src/data.mjs';

const read = (p) => readFileSync(new URL(p, import.meta.url));
const b64 = (p) => read(p).toString('base64');
const fonts = `
@font-face{font-family:"Bricolage Grotesque";font-style:normal;font-weight:300 800;font-stretch:75% 100%;font-display:swap;src:url(data:font/woff2;base64,${b64('./vendor/bricolage.woff2')}) format("woff2")}
@font-face{font-family:"Hanken Grotesk";font-style:normal;font-weight:400 600;font-display:swap;src:url(data:font/woff2;base64,${b64('./vendor/hanken.woff2')}) format("woff2")}`;
const bundle = async (file, extra = {}) => (await build({ entryPoints: [new URL(file, import.meta.url).pathname], bundle: true, minify: true, format: 'iife', write: false, target: 'es2020', logLevel: 'error', ...extra })).outputFiles[0].text;
const scene = await bundle('./src/scene.js');
// extras.js imports the real slop-scan.mjs; its Node-only imports are stubbed because scan() never touches them.
const stubNode = { name: 'stub-node', setup(b) {
  b.onResolve({ filter: /^node:/ }, (a) => ({ path: a.path, namespace: 'stub' }));
  b.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({ contents: 'export const readFileSync=0,readdirSync=0,statSync=0,join=0,extname=0;', loader: 'js' }));
} };
const extras = await bundle('./src/extras.js', { plugins: [stubNode], define: { 'process.argv': '[]' }, logLevel: 'silent' });
const inline = (js) => `<script>${js.replace(/<\/script/gi, '<\\/script')}</script>`;

const e = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const ext = (n, u, d) => `<li><a href="${e(u)}" target="_blank" rel="noopener">${e(n)}</a><span>${e(d)}</span></li>`;
const kb = KB.map(([g, rows]) => `<div class="kb-group"><h3>${e(g)}</h3>${rows.map(([p, d, w]) => `<div class="kb-row" data-kb><a href="${REPO + p}" target="_blank" rel="noopener">${e(p.replace(/^slopless\//, '').replace(/^references\//, ''))}</a><p>${e(d)}</p><span>${e(w)}</span></div>`).join('')}</div>`).join('');
const prompts = PROMPTS.map(([g, ps]) => `<div class="pg-group"><h3>${e(g)}</h3><div>${ps.map(([p, n]) => `<div class="pg-row"><div><p class="cp-src">${e(p)}</p><span>${e(n)}</span></div><button class="cp" type="button" aria-label="Copy prompt: ${e(p.slice(0, 40))}">Copy</button></div>`).join('')}</div></div>`).join('');

let html = read('./src/index.html').toString();
// Function replacers: minified code contains `$&`-style sequences that string replacers would expand.
html = html.replace('/*FONTS*/', () => fonts)
  .replace('<!--GSAP-->', () => inline(read('./vendor/gsap.min.js').toString()) + '\n' + inline(read('./vendor/ScrollTrigger.min.js').toString()))
  .replace('<!--SCENE-->', () => inline(scene))
  .replace('<!--EXTRAS-->', () => inline(extras))
  .replace('<!--KB-->', () => kb)
  .replace('<!--GALLERIES-->', () => GALLERIES.map((x) => ext(...x)).join(''))
  .replace('<!--EFFECTS-->', () => EFFECTS.map((x) => ext(...x)).join(''))
  .replace('<!--READING-->', () => READING.map((x) => ext(...x)).join(''))
  .replace('<!--PROMPTS-->', () => prompts);
writeFileSync(new URL('../docs/index.html', import.meta.url), html);
console.log(`docs/index.html ${(html.length / 1024).toFixed(0)} KB`);
