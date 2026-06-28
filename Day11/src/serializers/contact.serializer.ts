import { Contact } from "../types/contact.types";
import { SerializedContact } from "../types/contact.types";

export class ContactSerializer {
  static serialize(contact: Contact): SerializedContact {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
    };
  }

  static serializeMany(contacts: Contact[]): SerializedContact[] {
    return contacts.map(ContactSerializer.serialize);
  }

}