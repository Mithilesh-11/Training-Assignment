import { Contact } from "../contact.types";

// Cursor-based pagination result
export interface PaginatedContacts {
  data: SerializedContact[];
  nextCursor: string | null;
  limit: number;
}

// Serialized shape returned to API consumers
export interface SerializedContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Query options for the list endpoint
export interface ContactListQuery {
  cursor?: string;       // last seen id
  limit: number;         // page size
  search?: string;       // partial match on name or email
  email?: string;        // exact email filter
  sortBy: string[];      // e.g. ["name", "createdAt"]
  order: ("asc" | "desc")[];
}

// Audit log row
export interface AuditLogRow {
  id: number;
  contact_id: string;
  action: "UPDATE" | "DELETE";
  old_data: Contact;
  new_data: Contact | null;
  changed_at: Date;
}
