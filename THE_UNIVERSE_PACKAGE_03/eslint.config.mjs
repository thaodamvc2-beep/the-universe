import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig, globalIgnores } from 'eslint/config';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default defineConfig([
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  globalIgnores(['.next/**', 'apps/web/.next/**', 'apps/web/out/**', 'apps/web/build/**', 'apps/web/next-env.d.ts', 'out/**', 'build/**', 'next-env.d.ts', 'coverage/**']),
]);
