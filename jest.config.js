/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/src"
  ],
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
};