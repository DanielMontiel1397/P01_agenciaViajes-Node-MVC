// jest.config.js
export default {
    testEnvironment: 'node',
    transform: {},
    testMatch: ['**/__tests__/**/*.test.js'],
    collectCoverageFrom: [
        'controller/**/*.js',
        'routes/**/*.js',
        '!node_modules/**'
    ],
    setupFilesAfterEnv: ['./__tests__/setup.js'] 
};