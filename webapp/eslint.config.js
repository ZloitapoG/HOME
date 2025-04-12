// Импорт базовой конфигурации ESLint из корневого файла
import baseConfig from '../eslint.config.js'

/**
 * @type {import('eslint').Linter.Config[]}
 * Экспорт конфигурации ESLint для фронтенда
 */
export default [
  // Расширяем базовую конфигурацию
  ...baseConfig,

  // Настройки для фронтенда
  {
    // Указываем, к каким файлам применяется конфигурация
    files: ['**/*.{ts,tsx,js,jsx}'], // Все файлы с расширениями .ts, .tsx, .js, .jsx

    // Настройки языка
    languageOptions: {
      // Параметры парсера
      parserOptions: {
        project: [
          'tsconfig.json', // Основной конфигурационный файл TypeScript
          'tsconfig.node.json', // Конфигурация для Node.js (если используется)
          'tsconfig.app.json', // Конфигурация для приложения
        ],
      },
    },

    // Правила, специфичные для фронтенда
    rules: {
      // Отключаем правило, требующее импорт React в каждом файле (актуально для React 17+)
      'react/react-in-jsx-scope': 'off',

      // Правило для ограничения импортов из бэкенда
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@home/backend/**', '!@home/backend/**/', '!@home/backend/**/input'],
              allowTypeImports: true,
              message: 'Из бэкенда можно импортировать только типы и входные схемы',
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: '[object.type=MetaProperty][property.name=env]',
          message: 'Use instead import { env } from "lib/env"',
        },
      ],
    },
  },

  // Указываем, какие файлы и папки игнорировать
  {
    ignores: [
      'dist', // Игнорируем папку dist (собранные файлы)
      'node_modules', // Игнорируем папку node_modules (зависимости)
      'coverage', // Игнорируем папку coverage (отчеты о покрытии тестами)
      'eslint.config.js', // Игнорируем сам файл конфигурации ESLint
    ],
  },

  // Специальные настройки для Vite-конфига
  {
    // Указываем, что конфигурация применяется к файлу vite.config.ts
    files: ['./vite.config.ts'],

    // Настройки языка
    languageOptions: {
      // Параметры парсера
      parserOptions: {
        project: [
          'tsconfig.json', // Основной конфигурационный файл TypeScript
          'tsconfig.node.json', // Конфигурация для Node.js (если используется)
          'tsconfig.app.json', // Конфигурация для приложения
        ],
      },
    },
  },
]
