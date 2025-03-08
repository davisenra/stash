import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['src/**/*.js'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'prefer-const': 'error',
    },
  },
]);
