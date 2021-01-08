module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'eslint:recommended',
        'eslint-config-prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'import/no-unresolved': 0,
        'prefer-const': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
        'react/jsx-props-no-spreading': 0,
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        'react/jsx-indent': 0,
        'react/jsx-indent-props': 0,
        'react/jsx-one-expression-per-line': 0,,
        'jsx-a11y/anchor-is-valid': 0,
        'import/extensions': 0,
        'consistent-return': 0
    },
    ignorePatterns: [
        '__tests__',
        '__mocks__',
        'next.config.js',
        'jest.config.js',
        'jest.setup.js',
        'postcss.config.js',
        'tailwind.config.js'
    ]
}
