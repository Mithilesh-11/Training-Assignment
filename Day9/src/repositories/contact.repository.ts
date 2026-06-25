import { Contact } from "../types/contact.types";
import { contacts } from "../data/contacts";

export class ContactRepository {

  findAll(): Contact[] {
     return contacts.filter(
       (contact) => !contact.deletedAt
      );
     }

  findById(id: string): Contact | undefined {
    return contacts.find(
      (contact) =>contact.id === id && !contact.deletedAt
    );
  }

  findByEmail(email: string): Contact | undefined {
    return contacts.find(
      (contact) =>contact.email === email && !contact.deletedAt
    );
  }

  create( contact: Contact ): Contact {
    contacts.push(contact);
    return contact;
  }

  update(id: string, updatedData: Partial<Contact>): Contact | null {
    const index = contacts.findIndex(
        (contact) => contact.id === id && !contact.deletedAt
     );

    if (index === -1) {
        return null;
     }

    const currentContact = contacts[index];

    const updatedContact: Contact = {
        ...currentContact,
        ...updatedData,
        updatedAt: new Date(),
        version: currentContact.version + 1,
     };

     contacts[index] = updatedContact;

     return updatedContact;
    }


  delete(id: string): boolean {
    const contact = this.findById(id);

    if (!contact) {
      return false;
    }

    contact.deletedAt = new Date();

    return true;
  }
}