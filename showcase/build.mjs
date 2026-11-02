// Builds ../docs/index.html: one self-contained file (fonts, GSAP, Three.js scene inlined).
import { readFileSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';

const read = (p) => readFileSync(new URL(p, import.meta.url));
const b64 = (p) => read(p).toString('base64');
const fonts = `
@font-face{font-family:"Bricolage Grotesque";font-style:normal;font-weight:300 800;font-stretch:75% 100%;font-display:swap;src:url(data:font/woff2;base64,${b64('./vendor/bricolage.woff2')}) format("woff2")}
@font-face{font-family:"Hanken Grotesk";font-style:normal;font-weight:400 600;font-display:swap;src:url(data:font/woff2;base64,${b64('./vendor/hanken.woff2')}) format("woff2")}`;
const scene = await build({ entryPoints: [new URL('./src/scene.js', import.meta.url).pathname], bundle: true, minify: true, format: 'iife', write: false, target: 'es2020' });
const inline = (js) => `<script>${js.replace(/<\/script/gi, '<\\/script')}</script>`;

let html = read('./src/index.html').toString();
// Function replacers: minified code contains `$&`-style sequences that string replacers would expand.
html = html.replace('/*FONTS*/', () => fonts)
  .replace('<!--GSAP-->', () => inline(read('./vendor/gsap.min.js').toString()) + '\n' + inline(read('./vendor/ScrollTrigger.min.js').toString()))
  .replace('<!--SCENE-->', () => inline(scene.outputFiles[0].text));
writeFileSync(new URL('../docs/index.html', import.meta.url), html);
console.log(`docs/index.html ${(html.length / 1024).toFixed(0)} KB`);
