import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../../../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const version = () => read('slopless/VERSION').trim();

test('installed skill carries a stable semantic version', () => {
  assert.match(version(), /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/);
});

test('marketplace and changelog match the installed version', () => {
  const plugin = JSON.parse(read('.claude-plugin/marketplace.json')).plugins.find((p) => p.name === 'slopless');
  assert.equal(plugin.version, version());
  assert.ok(read('CHANGELOG.md').includes(`## [${version()}]`));
});

test('both source and published pages identify the same release', () => {
  for (const path of ['showcase/src/home.html', 'showcase/src/explore.html', 'docs/index.html', 'docs/explore.html']) {
    const html = read(path);
    assert.equal(html.split(`data-release="${version()}"`).length - 1, 1, path);
    assert.ok(html.includes('https://github.com/kundan0907/slopless/releases'), path);
  }
});
