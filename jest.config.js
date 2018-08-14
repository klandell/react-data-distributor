module.exports = {
  collectCoverageFrom: ['src/**', '!src/__snapshots__/**', '!src/index.js'],
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testRegex: 'src/.*\\.test\\.js$',
  transform: { '^.+\\.js$': 'babel-jest' },
};
