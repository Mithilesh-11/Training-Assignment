import dotenv from "dotenv";

const environment = process.env.NODE_ENV || "development";

dotenv.config({
  path: `.env.${environment}`,
});

export const config = {
  port: process.env.PORT || "3001",
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
};

const requiredVariables = [
  "DATABASE_URL",
];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing environment variable: ${variable}`);
  }
}