import { Contact } from "../types/contact.types";
import { contacts } from "../data/contacts";

export class ContactRepository {

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

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
    const normalizedEmail = this.normalizeEmail(email);

    return contacts.find(
      (contact) => this.normalizeEmail(contact.email) === normalizedEmail && !contact.deleted_at
    );
  }

  create( contact: Contact ): Contact {
    const normalizedContact: Contact = {
      ...contact,
      email: this.normalizeEmail(contact.email)
    };

    contacts.push(normalizedContact);
    return normalizedContact;
  }

  update(id: string, updatedData: Partial<Contact>): Contact | null {
    const index = contacts.findIndex(
        (contact) => contact.id === id && !contact.deleted_at
     );

    if (index === -1) {
        return null;
     }

    const currentContact = contacts[index];
    const normalizedUpdatedData = updatedData.email
      ? { ...updatedData, email: this.normalizeEmail(updatedData.email) }
      : updatedData;

    const updatedContact: Contact = {
        ...currentContact,
        ...normalizedUpdatedData,
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
    contact.updated_at = new Date();
    contact.version += 1;

    return true;
  }
}