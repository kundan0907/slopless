import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadPlaywright, launchBrowser, VERSION } from '../browser.mjs';

test('offline runtime lookup never invokes the installer', () => {
  const dir = mkdtempSync(join(tmpdir(), 'slopless-browser-'));
  try {
    assert.throws(() => loadPlaywright({ roots: [], cacheDir: dir, install: false, run: () => assert.fail('network') }), /Host browser|host browser/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('cold provisioning is pinned, cached and does not touch the working project', () => {
  const dir = mkdtempSync(join(tmpdir(), 'slopless-cache-'));
  const calls = [];
  try {
    const run = (command, args) => {
      calls.push([command, args]);
      const prefix = args[args.indexOf('--prefix') + 1];
      const pkg = join(prefix, 'node_modules', 'playwright');
      mkdirSync(pkg, { recursive: true });
      writeFileSync(join(pkg, 'package.json'), JSON.stringify({ name: 'playwright', version: VERSION, main: 'index.cjs' }));
      writeFileSync(join(pkg, 'index.cjs'), 'module.exports = { chromium: {} };');
    };
    const runtime = loadPlaywright({ roots: [], cacheDir: dir, run });
    assert.ok(runtime.playwright.chromium);
    assert.equal(calls.length, 1);
    assert.ok(calls[0][1].includes(`playwright@${VERSION}`));
    assert.ok(calls[0][1].includes('--ignore-scripts'));
    loadPlaywright({ roots: [], cacheDir: dir, install: false, run: () => assert.fail('reinstalled') });
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('only a missing executable triggers one browser install; launch failures remain failures', async () => {
  const calls = [];
  let attempts = 0;
  const runtime = { playwright: { chromium: { launch: async () => {
    if (++attempts === 1) throw new Error("Executable doesn't exist at /cache/chromium");
    return 'browser';
  } } }, cli: '/cache/playwright/cli.js' };
  assert.equal(await launchBrowser(runtime, { run: (...args) => calls.push(args) }), 'browser');
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0][1], ['/cache/playwright/cli.js', 'install', 'chromium', '--only-shell']);
  runtime.playwright.chromium.launch = async () => { throw new Error('Missing host system libraries'); };
  await assert.rejects(launchBrowser(runtime, { run: () => assert.fail('retry loop') }), /Missing host system libraries/);
});
