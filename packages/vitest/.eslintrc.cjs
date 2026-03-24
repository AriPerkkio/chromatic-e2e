module.exports = {
  extends: ['@storybook/eslint-config-storybook'],
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

        // Namespaced internal __chromatic_ commands
        'no-underscore-dangle': ['off'],

        // Resolver cannot find these
        'import/no-unresolved': [
          'error',
          { ignore: ['@chromatic-com/shared-e2e', 'vitest/browser'] },
        ],

        // We want better stack traces
        '@typescript-eslint/return-await': ['off'],
      },
    },
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      rules: {
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-restricted-syntax': 'off',
      },
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
  ],
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};
