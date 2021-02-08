// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/internals/jestSettings.js"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.mdx$": "@storybook/addon-docs/jest-transform-mdx",
    },
    moduleNameMapper: {
        // https://jestjs.io/docs/en/webpack#handling-static-assets
        "\\.(css|less)$": "<rootDir>/internals/__mocks__/styleMock.js",
        "^components(.*)$": "<rootDir>/src/components$1",
        "^screens(.*)$": "<rootDir>/src/screens$1",
        "^src(.*)$": "<rootDir>/src$1",
        "^modules(.*)$": "<rootDir>/src/modules$1",
        "^utils(.*)$": "<rootDir>/src/utils$1",
    },
    testPathIgnorePatterns: ["e2e"],
    moduleDirectories: ["node_modules", "src"],
    coverageThreshold: {
        global: {
            branches: 75,
            functions: 75,
            lines: 75,
            statements: -85,
        },
    },
};
