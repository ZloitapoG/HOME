// Импорт базовой конфигурации ESLint из корневого файла
import baseConfig from '../eslint.config.js';

/**
 * @type {import('eslint').Linter.Config[]}
 * Экспорт конфигурации ESLint для бэкенда
 */
export default [
  // Расширяем базовую конфигурацию
  ...baseConfig,

  // Настройки для бэкенда
  {
    // Указываем, к каким файлам применяется конфигурация
    files: ['**/*.{ts,js}'], // Все файлы с расширениями .ts и .js

    // Настройки языка
    languageOptions: {
      // Параметры парсера
      parserOptions: {
        project: './tsconfig.json', // Используем настройки TypeScript из tsconfig.json
      },
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
];