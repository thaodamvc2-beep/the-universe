import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals.js';
import nextTypeScript from 'eslint-config-next/typescript.js';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores(['.next/**', 'apps/web/.next/**', 'apps/web/out/**', 'apps/web/build/**', 'apps/web/next-env.d.ts', 'out/**', 'build/**', 'next-env.d.ts', 'coverage/**']),
]);
