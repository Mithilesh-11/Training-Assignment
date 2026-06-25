import { Contact } from "../types/contact.types";

export const contacts: Contact[] = [
  {
    id: "cnt_001",
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "Pune, Maharashtra",
    internalNotes: "VIP Customer",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    version: 1
  }
];