/** @type{import('jest').Config} */
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  verbose: true,
  moduleNameMapper: {
    '^#/(.*)$': ['<rootDir>/src/$1']
  },
  testEnvironment: 'jest-environment-node'
};
