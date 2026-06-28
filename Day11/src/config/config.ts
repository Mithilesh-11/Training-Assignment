import dotenv from "dotenv";
const environment = process.env.NODE_ENV || "development";

dotenv.config({path: `.env.${environment}`});
export const config = {
  port: process.env.PORT || "3001",
  nodeEnv:process.env.NODE_ENV || "development",
  databaseUrl:process.env.DATABASE_URL || "",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "default_access_secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
};
