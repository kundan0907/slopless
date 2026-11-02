#!/usr/bin/env node
// WCAG contrast ratio. Usage: node contrast.mjs '#fg' '#bg'
const lum = (hex) => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  return [0, 2, 4]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
};
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

if (import.meta.url === `file://${process.argv[1]}`) {
  const [fg, bg] = process.argv.slice(2);
  if (!/^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(fg || '') || !/^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(bg || '')) { console.error("usage: contrast.mjs '#fg' '#bg'"); process.exit(2); }
  const r = ratio(fg, bg);
  console.log(`${r.toFixed(2)}:1  body ${r >= 4.5 ? 'PASS' : 'FAIL'}  large/icons ${r >= 3 ? 'PASS' : 'FAIL'}`);
}
