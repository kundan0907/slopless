import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { loadPlaywright, launchBrowser } from '../browser.mjs';

const enabled = process.env.SLOPLESS_BROWSER_TESTS === '1';
const controller = fileURLToPath(new URL('../../assets/deck-controller.js', import.meta.url));
const shoot = fileURLToPath(new URL('../shoot.mjs', import.meta.url));

test('real browser: deck states, rapid navigation, reduced motion and capture dimensions', { skip: !enabled }, async () => {
  const dir = mkdtempSync(join(tmpdir(), 'slopless-deck-'));
  const browser = await launchBrowser(loadPlaywright({ install: false }), { install: false });
  try {
    const file = join(dir, 'deck.html');
    writeFileSync(file, `<!doctype html><html lang="en"><style>body{margin:0}.slide{padding:24px}button{font-size:20px}</style><main data-deck><section class="slide"><h1>12 contributors</h1><p data-b="1">Team A: 40%; Team B: 60%</p><input autofocus aria-label="Notes"><div contenteditable>Editable notes</div><div contenteditable="plaintext-only">Plain notes</div></section><section class="slide"><h2>Next steps</h2><p data-b="1">Keep the caveat.</p></section></main><button data-deck-next>Next</button><button data-deck-prev>Back</button><script>${readFileSync(controller, 'utf8')}</script></html>`);
    const page = await browser.newPage();
    await page.goto(new URL('file://' + file).href);
    const state = () => page.locator('[data-deck]').getAttribute('data-slopless-beat');
    assert.equal(await state(), '1:0');
    await page.locator('h1').click();
    await page.keyboard.press('ArrowRight');
    assert.equal(await state(), '1:1');
    for (const editor of ['[contenteditable=""]', '[contenteditable="plaintext-only"]']) {
      await page.locator(editor).focus(); await page.keyboard.press('End');
      assert.equal(await state(), '1:1', editor);
    }
    await page.locator('[data-slopless-ready="true"]').waitFor();
    await page.locator('input').focus(); await page.keyboard.press('ArrowRight');
    assert.equal(await state(), '1:1');
    await page.locator('input').evaluate((e) => e.blur());
    for (let i = 0; i < 12; i++) await page.keyboard.press('ArrowRight');
    for (let i = 0; i < 12; i++) await page.keyboard.press('ArrowLeft');
    await page.locator('[data-slopless-ready="true"]').waitFor();
    assert.equal(await state(), '1:0');
    assert.equal(await page.locator('.slide:visible').count(), 1);
    await page.click('[data-deck-next]'); assert.equal(await state(), '1:1');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.keyboard.press('End');
    assert.equal(await state(), '2:1');
    assert.equal(await page.locator('[data-deck]').getAttribute('data-slopless-ready'), 'true');
    await page.goto('file://' + file + '#2'); await page.reload(); assert.equal(await state(), '2:0');
    await page.evaluate(() => { location.hash = '#1'; });
    await page.waitForFunction(() => document.querySelector('[data-deck]').dataset.sloplessBeat === '1:0');
    const out = join(dir, 'shots');
    const result = spawnSync(process.execPath, [shoot, file, '--sizes', '1080x1350', '--deck', '--all', '--ready', '[data-slopless-ready="true"]', '--no-install', '--out', out], { encoding: 'utf8', timeout: 30000 });
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(readFileSync(join(out, 'capture.json')));
    assert.deepEqual(report.captures.map((c) => c.beat), ['1:0', '1:1', '2:0', '2:1']);
    const png = readFileSync(report.captures[0].path);
    assert.equal(png.readUInt32BE(16), 1080); assert.equal(png.readUInt32BE(20), 1350);
  } finally { await browser.close(); rmSync(dir, { recursive: true, force: true }); }
});

test('capture waits for a 1600ms handoff instead of skipping its beat', { skip: !enabled }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'slopless-handoff-'));
  try {
    const file = join(dir, 'slow.html'), out = join(dir, 'shots');
    writeFileSync(file, `<!doctype html><main data-slopless-ready="true" data-slopless-beat="1:0"><section class="slide"><p>Claim</p><p data-b="1">Evidence</p></section></main><script>
      const stage = document.querySelector('main');
      addEventListener('keydown', () => {
        if (stage.dataset.sloplessReady !== 'true') return;
        stage.dataset.sloplessReady = 'false';
        setTimeout(() => { stage.dataset.sloplessBeat = '1:1'; stage.dataset.sloplessReady = 'true'; }, 1600);
      });
    </script>`);
    const result = spawnSync(process.execPath, [shoot, file, '--sizes', '400x300', '--deck', '--all', '--ready', '[data-slopless-ready="true"]', '--no-install', '--out', out], { encoding: 'utf8', timeout: 15000 });
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(readFileSync(join(out, 'capture.json')));
    assert.deepEqual(report.captures.map((c) => c.beat), ['1:0', '1:1']);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
