export default {
    testEnvironment: "node",
    verbose: true,
    testMatch: ["**/test/*.test.js"],
    forceExit: true,
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
    setupFilesAfterEnv: ["./src/test/setup.js"],
};
