import mysql from "mysql2/promise";
import dotenv from "dotenv";

const environment = process.env.NODE_ENV || "development";
dotenv.config({path: `.env.${environment}`});

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "crm_lite",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
