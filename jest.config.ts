import type { Config } from "jest";

const config: Config = {
  reporters: ["default", "jest-junit"],
  resetMocks: true,
};

export default config;
