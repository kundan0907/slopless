import { realpathSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// Node resolves a module's symlink; compare the invocation using the same real path.
export function isMain(url) {
  try { return url === pathToFileURL(realpathSync(process.argv[1])).href; }
  catch { return false; }
}
