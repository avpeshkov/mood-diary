// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/internals/jestSettings.js"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
    moduleNameMapper: {
        // https://jestjs.io/docs/en/webpack#handling-static-assets
        "\\.(css|less)$": "<rootDir>/internals/__mocks__/styleMock.js",
        "^api(.*)$": "<rootDir>/src/api$1",
        "^types(.*)$": "<rootDir>/src/types$1",
        "^components(.*)$": "<rootDir>/src/components$1",
        "^services(.*)$": "<rootDir>/src/services$1",
        "^pages(.*)$": "<rootDir>/src/pages$1",
        "^helpers(.*)$": "<rootDir>/src/helpers$1",
    },
};
