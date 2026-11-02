// Optional screenshot runtime. Provision once in a user cache, never in the target project.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, delimiter } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

export const VERSION = '1.64.1';
const here = dirname(fileURLToPath(import.meta.url));
const CACHE = process.env.SLOPLESS_CACHE_DIR || join(homedir(), '.cache', 'slopless');
const runCommand = (command, args) => execFileSync(command, args, {
  encoding: 'utf8', timeout: 120000, maxBuffer: 2 * 1024 * 1024,
  env: { ...process.env, PATH: dirname(process.execPath) + delimiter + process.env.PATH, npm_config_update_notifier: 'false' },
});

function findRuntime(roots) {
  for (const root of roots) {
    try {
      const require = createRequire(join(root, 'slopless-runtime.cjs'));
      const entry = require.resolve('playwright');
      return { playwright: require(entry), cli: join(dirname(entry), 'cli.js') };
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND') throw e;
    }
  }
}

export function loadPlaywright({ roots = [process.cwd(), here], cacheDir = CACHE, install = true, run = runCommand } = {}) {
  const cache = join(cacheDir, `playwright-${VERSION}`);
  const found = findRuntime([...roots, cache]);
  if (found) return found;
  if (!install) throw new Error('No cached Playwright runtime. Use the host browser, or rerun without --no-install when online.');
  if (+process.versions.node.split('.')[0] < 20) throw new Error('Automatic screenshots need Node 20+. Use the host browser on older runtimes.');
  mkdirSync(cache, { recursive: true });
  console.error(`Preparing screenshot runtime ${VERSION} in ${cache} (first use only).`);
  // Resolve npm beside the running Node before falling back to PATH; no shell interpolation.
  const require = createRequire(join(dirname(process.execPath), 'slopless-npm.cjs'));
  let command = 'npm', prefix = [];
  try { prefix = [join(dirname(require.resolve('npm/package.json')), 'bin', 'npm-cli.js')]; command = process.execPath; } catch {}
  try {
    run(command, [...prefix, 'install', '--prefix', cache, '--no-save', '--package-lock=false', '--ignore-scripts', '--no-audit', '--no-fund', `playwright@${VERSION}`]);
  } catch (e) { throw new Error(`Screenshot setup failed: ${String(e.stderr || e.message).slice(-1200)}. Use the host browser or retry when npm/network access is available.`); }
  const runtime = findRuntime([cache]);
  if (!runtime) throw new Error('Screenshot runtime was not installed. Use the host browser; do not search unrelated projects.');
  return runtime;
}

export async function launchBrowser(runtime, { install = true, run = runCommand } = {}) {
  try { return await runtime.playwright.chromium.launch(); }
  catch (e) {
    if (!install || !/Executable doesn't exist/.test(e.message)) throw e;
    console.error('Preparing Chromium headless shell (first use only).');
    run(process.execPath, [runtime.cli, 'install', 'chromium', '--only-shell']);
    return runtime.playwright.chromium.launch();
  }
}
