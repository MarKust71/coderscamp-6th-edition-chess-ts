module.exports = {
    plugins: ['import', 'jest', 'html', 'css-modules'],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                moduleDirectory: ['node_modules', 'src/'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.types', '.types.tsx', '.d.ts'],
            },
        },
    },
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:jest/style', 'plugin:css-modules/recommended'],
    rules: {
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
            },
        ],
        'max-len': ['error', 120],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/ban-ts-comment': 2,
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'import/extensions': ['error', 'never', { svg: 'always', tsx: 'never', types: 'never' }],
        'import/order': [
            'error',
            {
                groups: [
                    ['external', 'builtin'],
                    ['parent', 'internal'],
                    ['index', 'sibling'],
                ],
                'newlines-between': 'always',
            },
        ],
        'import/no-duplicates': 2,
        'import/no-useless-path-segments': 2,
        'import/prefer-default-export': 0,
        'import/named': 0,
        'import/namespace': 0,
        'import/default': 0,
        'import/no-named-as-default-member': 0,
        'import/no-named-as-default': 0,
        'import/no-cycle': 0,
        'import/no-unused-modules': 0,
        'import/no-deprecated': 0,
        '@typescript-eslint/indent': 0,
        'import/no-anonymous-default-export': 2,
        'jest/no-identical-title': 2,
        'jest/valid-expect': 2,
        camelcase: 2,
        'prefer-destructuring': 2,
        'no-nested-ternary': 2,
        'css-modules/no-unused-class': [2, { camelCase: true }],
        'css-modules/no-undef-class': [2, { camelCase: true }],
    },
    parserOptions: {
        sourceType: 'module',
    },
};
