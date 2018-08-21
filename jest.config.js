module.exports = {
  testMatch: ['**/__tests__/**/*.test.js'],
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '__tests__']
}
