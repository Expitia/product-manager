import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/", "__test__"],
  testEnvironment: "jest-environment-jsdom",
};
export default createJestConfig(customJestConfig);
