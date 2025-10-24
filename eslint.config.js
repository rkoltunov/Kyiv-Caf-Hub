/** @type {import('eslint').Linter.Config[]} */
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

// ---------------------------------------------------------------------
// 1️⃣  Папки, которые нужно игнорировать
// ---------------------------------------------------------------------
const ignorePatterns = [
  'dist/',
  'node_modules/',
  'coverage/',
  'eslint.config.js',   // не проверяем свой конфиг
  'vite.config.ts',    // (если не нужен)
];

// ---------------------------------------------------------------------
// 2️⃣  Основной Flat‑Config
// ---------------------------------------------------------------------
export default tseslint.config(
  // 2.1 – игнорируем указанные директории
  { ignores: ignorePatterns },

  // 2.2 – правила для всех *.js, *.ts, *.tsx файлов
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        // **Мы НЕ указываем project**, поэтому тип‑чекер не нужен
        // Если захочешь тип‑чекер, включи project и добавь все файлы в tsconfig
        tsconfigRootDir:
          import.meta.dirname ?? new URL('.', import.meta.url).pathname,
      },
    },

    // 2.3 – подключаем плагины (объект, как требует Flat Config)
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      prettier,
    },

    // 2.4 – «расширяем» готовые наборы правил (Flat‑Config только)
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      // (reactHooks уже добавлен вручную в rules)
      // (reactRefresh тоже только правило, добавлено вручную)
      prettierConfig,
    ],

    // 2.5 – настройки (указываем версию React)
    settings: {
      react: {
        version: 'detect',
      },
    },

    // 2.6 – собственные правила проекта
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            pascalCase: true, // для компонентов
            camelCase: true,  // для хелперов
          },
        },
      ],
      'react/jsx-no-target-blank': 'off',
      // ── React ───────────────────────
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // ── React‑Refresh (единственное правило, которое предоставляет плагин) ──
      'react-refresh/only-export-components': 'warn',

      // ── Hooks ───────────────────────
      // Эти правила находятся в `reactHooks.configs.recommended`, но мы прописали их вручную,
      // чтобы избежать конфликта с legacy‑config.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ── TypeScript ─────────────────
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // ── Prettier ───────────────────
      'prettier/prettier': 'error',

      // ── JSX‑A11Y (добавляем нужные правила вручную) ──
      'jsx-a11y/alt-text': [
        'error',
        { elements: ['img', 'object', 'area', 'input[type="image"]'] },
      ],
      'jsx-a11y/anchor-is-valid': [
        'error',
        { aspects: ['noHref', 'invalidHref', 'preferButton'] },
      ],

      // ── Отключаем предупреждение о target="_blank"
      // Убери эту строку, если хочешь, чтобы правило снова проверяло ссылки.
      'react/jsx-no-target-blank': 'off',
    },
  }
);