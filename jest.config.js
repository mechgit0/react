module.exports = {
 setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom', // Suitable for React testing
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Specify the files to check for coverage
    "!src/**/*.d.ts", // Exclude type definition files
    "!src/index.{js,jsx,ts,tsx}", // Exclude entry point
  ],
  coverageDirectory: "coverage", // Directory for coverage reports
  coverageReporters: ["json", "lcov", "text", "clover"], // Types of reports
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Handle CSS imports
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // Additional Jest setup
};

