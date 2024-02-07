module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Optionally, specify the locations of your test files
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    // If you are using Babel, you might include the "babelConfig" property here
};
