const { defaults } = require('jest-config');

module.exports = {
    roots: ['<rootDir>'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
