import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseArgs, splitIconName, styleSvg, svgFromData, parseFontCss, fontFaceCss, fontUrl } from '../assets.mjs';

test('parseArgs separates positionals and flags', () => {
  const r = parseArgs(['icon', 'lucide:x', '--size', '20', '--inline', '--out', 'a.svg']);
  assert.deepEqual(r._, ['icon', 'lucide:x']);
  assert.deepEqual(r.flags, { size: '20', inline: true, out: 'a.svg' });
});

test('splitIconName validates prefix:name', () => {
  assert.deepEqual(splitIconName('material-symbols:home-outline'), { prefix: 'material-symbols', name: 'home-outline' });
  assert.throws(() => splitIconName('arrow-right'));
});

test('styleSvg rewrites size and stroke', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path stroke-width="2" d="M0 0"/></svg>';
  const out = styleSvg(svg, { size: 32, stroke: 1.5 });
  assert.match(out, /<svg width="32" height="32" xmlns/);
  assert.equal((out.match(/width="/g) || []).length, 2); // root width + stroke-width
  assert.match(out, /stroke-width="1.5"/);
  assert.equal(styleSvg(svg), svg);
});

test('svgFromData builds an svg and follows aliases', () => {
  const j = { prefix: 'x', width: 24, height: 24, icons: { a: { body: '<path d="M0"/>' } }, aliases: { b: { parent: 'a' } } };
  assert.match(svgFromData(j, 'a'), /viewBox="0 0 24 24" width="24" height="24"><path d="M0"\/><\/svg>/);
  assert.match(svgFromData(j, 'b'), /<path d="M0"\/>/);
  assert.throws(() => svgFromData(j, 'nope'));
});

const CSS = `/* cyrillic */
@font-face { font-family: 'Hanken Grotesk'; font-style: normal; font-weight: 400 600; src: url(https://fonts.gstatic.com/c.woff2) format('woff2'); unicode-range: U+0400-045F; }
/* latin */
@font-face { font-family: 'Hanken Grotesk'; font-style: normal; font-weight: 400 600; src: url(https://fonts.gstatic.com/l.woff2) format('woff2'); unicode-range: U+0000-00FF; }`;

test('parseFontCss keeps only the latin face', () => {
  const f = parseFontCss(CSS);
  assert.equal(f.length, 1);
  assert.deepEqual([f[0].family, f[0].weight, f[0].url, f[0].range], ['Hanken Grotesk', '400 600', 'https://fonts.gstatic.com/l.woff2', 'U+0000-00FF']);
  assert.match(fontFaceCss(f[0], './x.woff2'), /font-weight:400 600;.*url\(\.\/x\.woff2\)/);
});

test('fontUrl encodes family and weights', () => {
  assert.match(fontUrl('Hanken Grotesk', '400..700'), /family=Hanken\+Grotesk:wght@400\.\.700/);
  assert.match(fontUrl('Inter', '400,700'), /wght@400;700/);
});
