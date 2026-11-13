import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scan } from '../slop-scan.mjs';
import { ratio } from '../contrast.mjs';

const rules = (src, ext = '.html') => scan(src, ext).map((f) => `${f.level}:${f.rule}`);

test('flags the classic generated hero', () => {
  const slop = `<style>.hero{background:linear-gradient(135deg,#7c3aed,#2563eb)}
  h1{background-clip:text}.eyebrow{text-transform:uppercase;letter-spacing:.2em}
  body{font-family:Inter,sans-serif}.card{box-shadow:0 0 40px #7c3aed}</style>
  <p class="eyebrow">Introducing</p><h1>🚀 Unlock seamless workflows</h1><a>Get started</a>`;
  const r = rules(slop);
  for (const x of ['FAIL:violet-gradient', 'FAIL:gradient-text', 'FAIL:emoji', 'FAIL:copy', 'WARN:default-font', 'WARN:eyebrow', 'WARN:glow', 'WARN:weak-cta']) assert.ok(r.includes(x), x);
});

test('passes a decided page and ignores code, scripts and inlined assets', () => {
  const ok = `<style>body{background:#0B0C0F;color:#ECE8E1;font-family:"Bricolage Grotesque"}</style>
  <h1>Ship the deck</h1><code>seamless 🚀</code><script>const unlock = '🚀'</script>
  <img src="data:image/png;base64,${'A'.repeat(200)}">`;
  assert.deepEqual(rules(ok), []);
});

test('tailwind violet gradient and copy in tsx', () => {
  const r = rules(`<div className="bg-gradient-to-r from-violet-500 to-indigo-600">Elevate your team</div>`, '.tsx');
  assert.ok(r.includes('FAIL:violet-gradient') && r.includes('FAIL:copy'));
});

test('contrast ratio matches WCAG reference values', () => {
  assert.equal(ratio('#000', '#fff').toFixed(1), '21.0');
  assert.equal(ratio('#767676', '#ffffff').toFixed(2), '4.54');
});

test('ignore markers exclude deliberate examples', () => {
  const src = `<h1>Ship it</h1><!-- slopless-ignore-start --><p>🚀 Unlock seamless</p><!-- slopless-ignore-end -->`;
  assert.deepEqual(rules(src), []);
});


test('motion cap catches 300ms and seconds, excluding delays and unrelated CSS', () => {
  for (const value of ['opacity 300ms ease', 'opacity .4s ease', 'enter 700ms ease']) {
    assert.ok(rules(`<style>.item{transition:${value}}</style>`).includes('FAIL:motion-duration'), value);
  }
  assert.ok(rules('<style>.item{animation-duration:0.3s,120ms}</style>').includes('FAIL:motion-duration'));
  assert.deepEqual(rules('<style>.item{transition:opacity 240ms ease 700ms;animation:enter 200ms ease 500ms;transition-delay:900ms;width:300px}</style>'), []);
});

test('motion path catches authored straight travel, preserves curved paths and reports unresolved times', () => {
  assert.ok(rules(`<style>.item{offset-path:path('M0 0 L100 100')}</style>`).includes('FAIL:motion-straight-path'));
  assert.deepEqual(rules(`<style>.item{offset-path:path('M0 0 Q50 -20 100 100');transition:offset-distance 240ms ease}</style>`), []);
  assert.ok(rules('<style>.item{transition-duration:var(--motion-base)}</style>').includes('WARN:motion-unresolved'));
});

test('motion candidates ignore CSS comments and defer variable fallbacks to computed measurement', () => {
  assert.deepEqual(rules('/* transition: opacity 700ms */ .item{transition:opacity 100ms}', '.css'), []);
  const r = rules('.item{--duration:120ms;transition:opacity var(--duration,500ms)}', '.css');
  assert.ok(r.includes('WARN:motion-unresolved'));
  assert.ok(!r.includes('FAIL:motion-duration'));
});

test('motion declarations exclude quoted CSS examples and JavaScript line comments', () => {
  assert.deepEqual(rules('.item{--example:"transition: opacity 700ms"}', '.css'), []);
  assert.deepEqual(rules('// transition: opacity 700ms\nexport const n = 1;', '.js'), []);
  assert.ok(rules('const Widget = styled.div`transition:opacity 400ms`;', '.tsx').includes('WARN:motion-duration'));
});

test('a literal duration beside a variable easing is judged, not deferred', () => {
  assert.deepEqual(rules('.item{transition:transform .16s var(--out)}', '.css'), []);
  assert.deepEqual(rules('.item{transition:color .5s var(--out)}', '.css'), ['FAIL:motion-duration']);
  assert.deepEqual(rules('.item{transition:opacity var(--base) ease 500ms}', '.css'), ['WARN:motion-unresolved']);
});

test('motion findings carry the source line in CSS and HTML', () => {
  const lines = (src, ext) => scan(src, ext).map((f) => f.line);
  assert.deepEqual(lines('.a{color:red}\n/* note\n */\n.item{transition:opacity .4s}\n.b{offset-path:path("M0 0 L9 0")}', '.css'), [4, 5]);
  assert.deepEqual(lines('<p>a</p>\n<script>\nlet a;\n</script>\n<style>\n.a{color:red}\n.item{transition:opacity .4s}</style>\n<i style="transition:width 1s">b</i>', '.html'), [7, 8]);
});

test('a duration token defined only as literal times in the same source is judged by its longest value', () => {
  assert.deepEqual(rules(':root{--t:.15s}@media (prefers-reduced-motion:reduce){:root{--t:0s}}.a{transition:color var(--t),opacity var(--t) ease}', '.css'), []);
  assert.deepEqual(rules(':root{--slow:400ms}.a{transition:color var(--slow)}', '.css'), ['FAIL:motion-duration']);
  assert.deepEqual(rules(':root{--t:calc(1s / 4)}.a{transition:color var(--t)}', '.css'), ['WARN:motion-unresolved']);
});
