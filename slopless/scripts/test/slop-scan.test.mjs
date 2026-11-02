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
