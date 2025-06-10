import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier,
  {
    files: ['**/*.{js,jsx,tsx,ts}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
