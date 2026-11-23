import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFile(resolve(root, path), 'utf8');

test('the application uses the approved web foundation stack', async () => {
  const pkg = JSON.parse(await read('apps/web/package.json'));
  const workspace = JSON.parse(await read('package.json'));
  assert.match(pkg.dependencies.next, /^\^15\./);
  assert.match(pkg.dependencies.react, /^\^19\./);
  assert.ok(workspace.devDependencies.typescript);
  assert.ok(workspace.scripts.build && workspace.scripts.lint && workspace.scripts.typecheck && workspace.scripts.test);
  assert.deepEqual(workspace.workspaces, ['apps/web']);
});

test('the application shell mounts the approved guest-first universe game without downstream social systems', async () => {
  const page = await read('apps/web/src/app/page.tsx');
  const game = await read('apps/web/src/features/game/universe-game.tsx');
  const forbidden = [/chat/i, /friend list/i, /follow button/i, /player count/i, /social feed/i];
  for (const pattern of forbidden) assert.doesNotMatch(page, pattern);
  assert.match(page, /UniverseGame/);
  assert.match(game, /resetHome/);
  assert.match(game, /Về Trái Đất|Return to Earth/);
  assert.match(game, /guestIdentity/);
});
test('the static health endpoint is exported and exposes no secrets', async () => {
  const route = await read('apps/web/src/app/api/health/route.ts');
  // GitHub Pages is static hosting: a static GET route cannot promise runtime Cache-Control: no-store.
  assert.match(route, /dynamic = 'force-static'/);
  assert.match(route, /status: 'ok'/);
  assert.doesNotMatch(route, /process\.env|SUPABASE_SERVICE_ROLE_KEY/);
});
test('static Pages deployment does not claim unsupported runtime security headers', async () => {
  const config = await read('apps/web/next.config.ts');
  assert.match(config, /output: 'export'/);
  assert.match(config, /poweredByHeader: false/);
  // Response security headers require a configurable hosting/CDN layer; Next config cannot enforce them on GitHub Pages.
  assert.doesNotMatch(config, /headers\s*\(/);
});
test('guest exploration and Earth navigation remain product guardrails', async () => {
  const agents = await read('AGENTS.md');
  assert.match(agents, /EARTH is always the Home World/);
  assert.match(agents, /Guest access is a supported product path/);
  assert.match(agents, /RETURN TO EARTH/);
  assert.match(agents, /FIND MY WAY BACK/);
});
