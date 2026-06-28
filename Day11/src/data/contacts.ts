import { Contact } from "../types/contact.types";

export const contacts: Contact[] = [
  {
    id: "cnt_001",
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "Pune, Maharashtra",
    internal_notes: "VIP Customer",
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    version: 1
  }
];