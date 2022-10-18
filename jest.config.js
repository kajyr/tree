module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
  moduleDirectories: ['common/src', 'node_modules', 'frontend/src', 'backend'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  setupFiles: [],
  testEnvironmentOptions: { url: 'http://localhost/' },
  testMatch: ['**/*.test.{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
