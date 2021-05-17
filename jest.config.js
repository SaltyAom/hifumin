module.exports = {
    roots: ['<rootDir>'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        '\\.(css|styl|scss|less|sass)$': '<rootDir>/__mocks__/styleMock.js',
        '^@pages(.*)$': '<rootDir>/src/pages$1',
        '^@layouts(.*)$': '<rootDir>/src/layouts$1',
        '^@components(.*)$': '<rootDir>/src/components$1',
        '^@styles(.*)$': '<rootDir>/src/styles$1',
        '^@services(.*)$': '<rootDir>/src/services$1',
        '^@models(.*)$': '<rootDir>/src/models$1',
    }
}
