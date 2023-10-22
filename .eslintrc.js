const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  globals: {
    describe: true,
    it: true,
    expect: true,
    beforeEach: true,
    NodeJS: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['react-refresh', '@typescript-eslint', 'simple-import-sort', 'prettier'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    'no-var': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-debugger': ['error'],
    'no-extra-bind': ['error'],
    'no-async-promise-executor': ['off'],

    // typescript (http://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/class-literal-property-style': ['error', 'getters'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-require-imports': ['off'],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],

    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['./polyfills'],
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Packages. `react|vue` related packages come first.
          ['^(react|vue|vite)', '^@?\\w'],
          ['^(@tmagic)(/.*|$)'],
          // Internal packages.
          ['^(@|@editor)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        semi: true,
        arrowParens: 'always',
        bracketSpacing: true,
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto',
      },
    ],
  },
});
