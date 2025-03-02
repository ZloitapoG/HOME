// Импорт плагинов и конфигураций ESLint
import pluginJs from '@eslint/js'; // Базовые правила ESLint для JavaScript
import eslintConfigPrettier from 'eslint-config-prettier'; // Отключает правила ESLint, конфликтующие с Prettier
import pluginImport from 'eslint-plugin-import'; // Плагин для правил, связанных с импортами
import prettierPlugin from 'eslint-plugin-prettier'; // Интеграция Prettier в ESLint
import eslintReact from 'eslint-plugin-react'; // Плагин для правил, связанных с React
import pluginReact from 'eslint-plugin-react'; // (Дублирование, можно удалить)
import globals from 'globals'; // Предоставляет глобальные переменные для ESLint
import tseslint from 'typescript-eslint'; // Плагин для поддержки TypeScript в ESLint
// import pluginJsxA11y from 'eslint-plugin-jsx-a11y'; // Плагин для доступности (закомментирован)

// Экспорт конфигурации ESLint
export default [
  // Указываем, к каким файлам применяется конфигурация
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], // Все файлы с указанными расширениями
  },

  // Указываем, какие файлы и папки игнорировать
  {
    ignores: ['node_modules', 'dist'], // Игнорируем папки node_modules и dist
  },

  // Подключаем плагины
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin, // Плагин для TypeScript
      react: eslintReact, // Плагин для React
      prettier: prettierPlugin, // Плагин для интеграции Prettier
      import: pluginImport, // Плагин для правил импортов
    },
  },

  // Настройки языка
  {
    languageOptions: {
      globals: globals.browser, // Глобальные переменные для браузера
    },
  },

  // Подключаем рекомендованные конфигурации
  pluginJs.configs.recommended, // Базовые правила ESLint для JavaScript
  ...tseslint.configs.recommended, // Рекомендованные правила для TypeScript
  pluginReact.configs.flat.recommended, // Рекомендованные правила для React

  // Настраиваем правила
  {
    rules: {
      // Правила для интеграции Prettier
      ...prettierPlugin.configs.recommended.rules,
      // Отключаем правила ESLint, которые конфликтуют с Prettier
      ...eslintConfigPrettier.rules,

      // React: отключаем правило, требующее импорт React в каждом файле (актуально для React 17+)
      'react/react-in-jsx-scope': 'off',

      // Правила для сортировки импортов
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc', // Сортировка по алфавиту
            caseInsensitive: false, // Учитывать регистр
            orderImportKind: 'asc', // Сортировка по типу импорта
          },
        },
      ],

      // TypeScript: используем `type` вместо `interface`
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // TypeScript: отключаем строгую проверку булевых выражений
      '@typescript-eslint/strict-boolean-expressions': 'off',

      // TypeScript: отключаем требование использовать `??` вместо `||`
      '@typescript-eslint/prefer-nullish-coalescing': 'off',

      // TypeScript: отключаем требование явно указывать тип возвращаемого значения функции
      '@typescript-eslint/explicit-function-return-type': 'off',

      // TypeScript: отключаем строгую проверку шаблонных строк
      '@typescript-eslint/restrict-template-expressions': 'off',

      // TypeScript: отключаем правило для тройных слэшей (///)
      '@typescript-eslint/triple-slash-reference': 'off',

      // TypeScript: отключаем правило для запрещенных типов
      '@typescript-eslint/ban-types': 'off',

      // TypeScript: отключаем правило для согласованных type assertions
      '@typescript-eslint/consistent-type-assertions': 'off',

      // Доступность: отключаем правило для валидности якорных тегов
      'jsx-a11y/anchor-is-valid': 'off',

      // Общие правила
      curly: ['error', 'all'], // Фигурные скобки обязательны для всех блоков
      'no-irregular-whitespace': ['error', { skipTemplates: true, skipStrings: true }], // Запрет на нерегулярные пробелы
      'no-console': ['error', { allow: ['info', 'error', 'warn'] }], // Запрет на console.log, но разрешены info, error, warn
    },
  },
];