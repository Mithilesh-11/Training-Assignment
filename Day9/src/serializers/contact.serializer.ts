import { Contact } from "../types/contact.types";

export class ContactSerializer {
    
    static serialize(contact: Contact) {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address
    };
  }

  static serializeMany(contacts: Contact[]) {
    return contacts.map( ContactSerializer.serialize );
  }
}