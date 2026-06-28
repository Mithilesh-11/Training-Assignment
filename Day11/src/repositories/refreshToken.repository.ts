import pool from "../config/db";
import { RefreshToken } from "../types/auth.types";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from "uuid";

export class RefreshTokenRepository {
  async create(userId: string, token: string, expiresAt: Date): Promise<RefreshToken> {
    const id = uuidv4();
    const sql = `
      INSERT INTO refresh_tokens (id, user_id, token, expires_at, revoked)
      VALUES (?, ?, ?, ?, false)
    `;
    await pool.query<ResultSetHeader>(sql, [id, userId, token, expiresAt]);

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM refresh_tokens WHERE id = ?",
      [id]
    );
    return rows[0] as RefreshToken;
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const sql = "SELECT * FROM refresh_tokens WHERE token = ?";
    const [rows] = await pool.query<RowDataPacket[]>(sql, [token]);
    if (rows.length === 0) return null;
    return rows[0] as RefreshToken;
  }

  async revoke(id: string): Promise<void> {
    const sql = "UPDATE refresh_tokens SET revoked = true WHERE id = ?";
    await pool.query(sql, [id]);
  }

  async revokeAllForUser(userId: string): Promise<void> {
    const sql = "UPDATE refresh_tokens SET revoked = true WHERE user_id = ?";
    await pool.query(sql, [userId]);
  }
}
