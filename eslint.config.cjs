const eslintConfigPrettier = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', '**/*.svg', '**/*.ico'],
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
      'prettier/prettier': 'warn',
      'simple-import-sort/imports': [
        'warn',
        { groups: [['^.*\\u0000$'], ['^\\u0000'], ['^@?\\w'], ['^'], ['^\\.']] },
      ],
      'simple-import-sort/exports': 'warn',
    },
  },
];
