import dotenv from "dotenv";
const environment = process.env.NODE_ENV || "development";

dotenv.config({path: `.env.${environment}`});
export const config = {
  port: process.env.PORT || "3001",
  nodeEnv:process.env.NODE_ENV || "development",
  databaseUrl:process.env.DATABASE_URL || "",
};
