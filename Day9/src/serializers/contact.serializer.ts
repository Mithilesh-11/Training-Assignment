import { Contact } from "../types/contact.types";
import { ContactResponseDto } from "../types/contact.types";

export class ContactSerializer {
  static serialize(contact: Contact): ContactResponseDto {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
    };
  }

  static serializeMany(contacts: Contact[]): ContactResponseDto[] {
    return contacts.map(ContactSerializer.serialize);
  }
}