/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['dist/', '.eslintrc.cjs', 'client/public/**/*.js'],
    env: {
        node: true,
    },
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' },
        ],
    },
};
