import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores(['.next/**', 'apps/web/.next/**', 'apps/web/out/**', 'apps/web/build/**', 'apps/web/next-env.d.ts', 'out/**', 'build/**', 'next-env.d.ts', 'coverage/**']),
]);
