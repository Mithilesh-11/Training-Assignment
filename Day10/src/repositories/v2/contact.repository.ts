import pool from "../../config/db";
import { Contact } from "../../types/contact.types";
import { ContactListQueryInput, SORT_FIELD_MAP, ContactInput, UpdateContactInput } from "../../validators/v2/contact.schema";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class ContactRepositoryV2 {

  async findAll(query: ContactListQueryInput): Promise<Contact[]> {
    const { cursor, limit, search, email, sortBy, order } = query;
    const conditions: string[] = ["deleted_at IS NULL"];
    const params: (string | number)[] = [];

    // Cursor — composite keyset: (created_at, id) > (cursor_created_at, cursor_id)
    // This correctly handles ties in created_at (e.g. batch inserts with same timestamp)
    // by using id as a tiebreaker, matching the ORDER BY created_at ASC, id ASC clause.
    if (cursor) {
      conditions.push(
        "(created_at, id) > ((SELECT created_at FROM contacts WHERE id = ?), ?)"
      );
      params.push(cursor, cursor);
    }

    // search — partial match on name OR email
    if (search) {
      conditions.push("(name LIKE ? OR email LIKE ?)");
      const term = `%${search}%`;
      params.push(term, term);
    }

    // exact email filter
    if (email) {
      conditions.push("email = ?");
      params.push(email);
    }

    // build ORDER BY from validated sortBy / order arrays
    const orderClauses = sortBy.map((field, i) => {
      const col = SORT_FIELD_MAP[field] ?? "created_at";
      const dir = (order[i] ?? "asc").toUpperCase();
      return `${col} ${dir}`;
    });
    // always add id as tiebreaker so cursor is stable
    orderClauses.push("id ASC");

    const where = conditions.join(" AND ");
    const orderBy = orderClauses.join(", ");

    params.push(limit + 1); // fetch one extra to detect next page

    const sql = `
      SELECT * FROM contacts
      WHERE ${where}
      ORDER BY ${orderBy}
      LIMIT ?
    `;

    const [rows] = await pool.query<RowDataPacket[]>(sql, params);
    return rows as Contact[];
  }




  // ─── Find by id ───────────────────────────────────────────────────────
  async findById(id: string): Promise<Contact | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM contacts WHERE id = ? AND deleted_at IS NULL",
      [id]
    );
    return (rows[0] as Contact) ?? null;
  }




  // ─── Find by email ────────────────────────────────────────────────────
  async findByEmail(email: string): Promise<Contact | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM contacts WHERE email = ? AND deleted_at IS NULL",
      [email]
    );
    return (rows[0] as Contact) ?? null;
  }






  // ─── Create ───────────────────────────────────────────────────────────
  async create(id: string, data: ContactInput): Promise<Contact> {
    const sql = `
      INSERT INTO contacts (id, name, email, phone, address, internal_notes, version)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `;
    await pool.query<ResultSetHeader>(sql, [
      id,
      data.name,
      data.email,
      data.phone,
      data.address,
      "Created by system",
    ]);
    return (await this.findById(id))!;
  }






  async update(id: string, data: UpdateContactInput): Promise<Contact | null> {
  const setClauses: string[] = [];
  const params: (string | number)[] = [];

  // 1. Loop through keys to build clauses dynamically
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      setClauses.push(`${key} = ?`);
      params.push(value);
    }
  }

  // 2. Return early if no fields were actually provided
  if (setClauses.length === 0) return this.findById(id);

  // 3. Add versioning and target ID parameters
  setClauses.push("version = version + 1");
  params.push(id);

  // 4. Execute query
  const sql = `UPDATE contacts SET ${setClauses.join(", ")} WHERE id = ? AND deleted_at IS NULL`;
  const [result] = await pool.query<ResultSetHeader>(sql, params);

  return result.affectedRows === 0 ? null : this.findById(id);
}




  // ─── Soft delete ──────────────────────────────────────────────────────
  async delete(id: string): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE contacts SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL",
      [id]
    );
    return result.affectedRows > 0;
  }






  // ─── Stats queries ────────────────────────────────────────────────────
  async countTotal(): Promise<number> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total FROM contacts WHERE deleted_at IS NULL"
    );
    return Number(rows[0].total);
  }

  async countAddedToday(): Promise<number> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total FROM contacts WHERE deleted_at IS NULL AND DATE(created_at) = CURDATE()"
    );
    return Number(rows[0].total);
  }

  async mostCommonEmailDomain(): Promise<string | null> {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT SUBSTRING_INDEX(email, '@', -1) AS domain, COUNT(*) AS cnt
      FROM contacts
      WHERE deleted_at IS NULL
      GROUP BY domain
      ORDER BY cnt DESC
      LIMIT 1
    `);
    return rows.length > 0 ? (rows[0].domain as string) : null;
  }
}