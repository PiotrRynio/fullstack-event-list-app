/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended/all'],
  setupFiles: ['dotenv/config', './src/setupTests.ts'],
};
