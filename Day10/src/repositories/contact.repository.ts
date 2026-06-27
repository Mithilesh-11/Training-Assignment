import { Contact } from "../types/contact.types";
import { contacts } from "../data/contacts";

export class ContactRepository {

  findAll(): Contact[] {
     return contacts.filter(
       (contact) => !contact.deleted_at
      );
     }

  findById(id: string): Contact | undefined {
    return contacts.find(
      (contact) =>contact.id === id && !contact.deleted_at
    );
  }

  findByEmail(email: string): Contact | undefined {
    return contacts.find(
      (contact) =>contact.email === email && !contact.deleted_at
    );
  }

  create( contact: Contact ): Contact {
    contacts.push(contact);
    return contact;
  }

  update(id: string, updatedData: Partial<Contact>): Contact | null {
    const index = contacts.findIndex(
        (contact) => contact.id === id && !contact.deleted_at
     );

    if (index === -1) {
        return null;
     }

    const currentContact = contacts[index];

    const updatedContact: Contact = {
        ...currentContact,
        ...updatedData,
        updated_at: new Date(),
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

    contact.deleted_at = new Date();

    return true;
  }
}