import pool from "../config/db";
import { Contact } from "../types/contact.types";
import { ResultSetHeader } from "mysql2";

export class AuditLogRepository {
  
  async logUpdate(contactId: string, oldData: Contact, newData: Contact): Promise<void> {
    const sql = `
      INSERT INTO contact_audit_logs (contact_id, action, old_data, new_data)
      VALUES (?, 'UPDATE', ?, ?)
    `;
    await pool.query<ResultSetHeader>(sql, [
      contactId,
      JSON.stringify(oldData),
      JSON.stringify(newData),
    ]);
  }

  async logDelete(contactId: string, oldData: Contact): Promise<void> {
    const sql = `
      INSERT INTO contact_audit_logs (contact_id, action, old_data, new_data)
      VALUES (?, 'DELETE', ?, NULL)
    `;
    await pool.query<ResultSetHeader>(sql, [contactId, JSON.stringify(oldData)]);
  }
}
