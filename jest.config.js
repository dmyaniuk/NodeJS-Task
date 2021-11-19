module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    roots: ['<rootDir>/test'],
    testRegex: '.test.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
};
