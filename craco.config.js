// craco.config.js
module.exports = {
  jest: {
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.test.{js,jsx,ts,tsx}"
    ],
    coverageReporters: [
      "lcov",
      "text"
    ],
    coverageThreshold: {
      global: {
        statements: 50,
        branches: 50,
        functions: 50,
        lines: 50
      }
    }
  }
};

