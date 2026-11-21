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

test('the application shell does not introduce downstream product systems', async () => {
  const page = await read('apps/web/src/app/page.tsx');
  const forbidden = [/chat/i, /friend list/i, /follow button/i, /player count/i, /social feed/i];
  for (const pattern of forbidden) assert.doesNotMatch(page, pattern);
  assert.match(page, /THE UNIVERSE/);
  assert.match(page, /ENTER AS GUEST|enterGuest/);
  assert.match(page, /home-world/);
});

test('the health endpoint is non-cacheable and exposes no secrets', async () => {
  const route = await read('apps/web/src/app/api/health/route.ts');
  assert.match(route, /Cache-Control/);
  assert.match(route, /no-store/);
  assert.match(route, /status: 'ok'/);
  assert.doesNotMatch(route, /process\.env|SUPABASE_SERVICE_ROLE_KEY/);
});

test('baseline security headers are configured', async () => {
  const config = await read('apps/web/next.config.ts');
  for (const header of ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy', 'Cross-Origin-Opener-Policy']) {
    assert.ok(config.includes(header), `Missing ${header}`);
  }
  assert.match(config, /poweredByHeader: false/);
});

test('guest exploration and Earth navigation remain product guardrails', async () => {
  const agents = await read('AGENTS.md');
  assert.match(agents, /EARTH is always the Home World/);
  assert.match(agents, /Guest access is a supported product path/);
  assert.match(agents, /RETURN TO EARTH/);
  assert.match(agents, /FIND MY WAY BACK/);
});
