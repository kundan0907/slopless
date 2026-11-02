import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, symlinkSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { scan } from '../slop-scan.mjs';

const scripts = fileURLToPath(new URL('../', import.meta.url));
const run = (file, args = []) => spawnSync(process.execPath, [file, ...args], { encoding: 'utf8' });

test('installed CLIs work through symlinks and paths containing spaces', () => {
  const dir = mkdtempSync(join(tmpdir(), 'slopless cli '));
  try {
    const link = join(dir, 'installed skill');
    symlinkSync(scripts, link, process.platform === 'win32' ? 'junction' : 'dir');
    const html = join(dir, 'page.html');
    writeFileSync(html, '<h1>Unlock seamless workflows</h1>');
    for (const [file, args] of [['slop-scan.mjs', [html]], ['contrast.mjs', ['#000', '#fff']], ['assets.mjs', []]]) {
      const canonical = run(join(scripts, file), args), installed = run(join(link, file), args);
      assert.ok(canonical.stdout || canonical.stderr, file);
      assert.equal(installed.status, canonical.status, file);
      assert.equal(installed.stdout, canonical.stdout, file);
      assert.equal(installed.stderr, canonical.stderr, file);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('scanner retains authored long lines and single-quoted styles', () => {
  assert.ok(scan(`<p>${'real content '.repeat(250)} seamless</p>`, '.html').some((f) => f.rule === 'copy'));
  assert.ok(scan("<div style='background:linear-gradient(90deg,#7c3aed,#2563eb)'>Proof</div>", '.html').some((f) => f.rule === 'violet-gradient'));
});

test('scanner rejects empty targets and reports invalid flags without a stack trace', () => {
  const dir = mkdtempSync(join(tmpdir(), 'slopless-empty-'));
  try {
    const empty = run(join(scripts, 'slop-scan.mjs'), [dir]);
    assert.equal(empty.status, 2); assert.match(empty.stderr, /No supported files/);
    const bad = run(join(scripts, 'slop-scan.mjs'), ['--allow']);
    assert.equal(bad.status, 2); assert.doesNotMatch(bad.stderr, /TypeError/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('screenshot CLI rejects misspelled and invalid options before provisioning', () => {
  for (const args of [['--size', '1080x1350'], ['--sizes', '0x900'], ['--steps', '-1'], ['--full', 'false']]) {
    const result = run(join(scripts, 'shoot.mjs'), ['page.html', ...args]);
    assert.equal(result.status, 2, args.join(' '));
    assert.match(result.stderr, /Unknown option|Invalid|Unexpected/);
    assert.doesNotMatch(result.stderr, /Playwright not found|ENOENT|Cannot find|npm install/);
  }
});

test('screenshot help succeeds without a target or browser setup', () => {
  const result = run(join(scripts, 'shoot.mjs'), ['--help']);
  assert.equal(result.status, 0); assert.match(result.stdout, /--ready/);
  assert.equal(result.stderr, '');
});
