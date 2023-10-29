module.exports = {
    projects: [
      {
        globalSetup: "./setup.ts",
        globalTeardown: "./teardown.ts",
        displayName: "tests",
        rootDir: "./",
        moduleFileExtensions: ["js", "json", "ts"],
        testMatch: ["**/__test__/**/*.+(ts|js)", "**/?(*.)+(test).+(ts|js)"],
        transform: {
          "^.+\\.(ts|tsx)$": "ts-jest",
        },
        testEnvironment: "node",
      },
      
    ],
  };