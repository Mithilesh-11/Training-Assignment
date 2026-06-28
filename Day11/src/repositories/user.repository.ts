import pool from "../config/db";
import { User } from "../types/auth.types";
import { RegisterInput } from "../validators/auth.schema";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from "uuid";

export class UserRepository {
  
  async findByEmail(email: string): Promise<User | null> {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query<RowDataPacket[]>(sql, [email]);
    if (rows.length === 0) return null;
    return rows[0] as User;
  }

  async findById(id: string): Promise<User | null> {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [rows] = await pool.query<RowDataPacket[]>(sql, [id]);
    if (rows.length === 0) return null;
    return rows[0] as User;
  }

  async create(data: RegisterInput & { passwordHash: string }): Promise<User> {
    const id = uuidv4();
    const sql = `
      INSERT INTO users (id, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `;
    await pool.query<ResultSetHeader>(sql, [
      id,
      data.email,
      data.passwordHash,
      data.role,
    ]);

    const user = await this.findById(id);
    if (!user) throw new Error("Failed to create user");
    return user;
  }
}
