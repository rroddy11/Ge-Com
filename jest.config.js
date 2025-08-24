module.exports = {
  preset: "jest-preset-angular",
  testEnvironment: "jest-environment-jsdom",
  roots: ["<rootDir>/src/"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  transform: {
    "^.+\\.(ts|html)$": [
      "ts-jest",
      { tsconfig: "<rootDir>/tsconfig.spec.json" },
    ],
  },
  moduleFileExtensions: ["ts", "html", "js", "json"],
  setupFilesAfterEnv: [], // plus besoin de setup-jest
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "lcov"],
};
