import dotenv from "dotenv";

dotenv.config();

const VALID_ENVIRONMENTS = ["local", "dev", "prod"] as const;

type Environment = (typeof VALID_ENVIRONMENTS)[number];

const rawEnv = process.env.ENVIRONMENT || "local";

const ENVIRONMENT: Environment = VALID_ENVIRONMENTS.includes(
  rawEnv as Environment
)
  ? (rawEnv as Environment)
  : "local";

const baseConfig = {
  PORT: Number(process.env.PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "jwtSecret",
  DATABASE_URL: process.env.DATABASE_URL || "",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  ENVIRONMENT,
};

const devConfig = {
  DATABASE_URL: process.env.DEV_DATABASE_URL || baseConfig.DATABASE_URL,
  REDIS_URL: process.env.DEV_REDIS_URL || baseConfig.REDIS_URL,
};

const prodConfig = {
  DATABASE_URL: process.env.PROD_DATABASE_URL || baseConfig.DATABASE_URL,
  REDIS_URL: process.env.PROD_REDIS_URL || baseConfig.REDIS_URL,
};

const localConfig = {
  DATABASE_URL: process.env.LOCAL_DATABASE_URL || baseConfig.DATABASE_URL,
  REDIS_URL: process.env.LOCAL_REDIS_URL || baseConfig.REDIS_URL,
};

const environmentConfigs = {
  local: localConfig,
  dev: devConfig,
  prod: prodConfig,
};

// Merge base + specific environment configs
export const config = {
  ...baseConfig,
  ...environmentConfigs[ENVIRONMENT],
};
