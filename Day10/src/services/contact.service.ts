import { v4 as uuid } from "uuid";
import {ContactInput, UpdateContactInput} from "../validators/contact.schema";
import { Contact } from "../types/contact.types";
import { ContactRepository } from "../repositories/contact.repository";
import { ContactSerializer } from "../serializers/contact.serializer";
import { ConflictError, NotFoundError} from "../errors/custom-errors";


export class ContactService {
  private repository = new ContactRepository();

    getAllContacts() {
        const contacts = this.repository.findAll();
        return ContactSerializer.serializeMany( contacts );
    }

    getContactById(id: string) {
        const contact = this.repository.findById(id);

        if (!contact) {
        throw new NotFoundError("The contact with the requested ID does not exist." );
        }

        return ContactSerializer.serialize( contact);
    }


  createContact( data: ContactInput) {
    const normalizedEmail = data.email.trim().toLowerCase();
    const existingContact = this.repository.findByEmail( normalizedEmail );

    if (existingContact) {
      throw new ConflictError( "A contact already exists with this email address." );
    }

    const newContact: Contact = {
      id: uuid(),
      name: data.name,
      email: normalizedEmail,
      phone: data.phone,
      address: data.address,
      internal_notes: "Created by system",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      version: 1
    };

    const contact = this.repository.create( newContact  );

    return ContactSerializer.serialize( contact );
  }



  updateContact( id: string,data: UpdateContactInput) {
    const existingContact = this.repository.findById(id);
    if (!existingContact) {
      throw new NotFoundError( "The contact with the requested ID does not exist." );
    }

    if (data.email && data.email.trim().toLowerCase() !== existingContact.email.trim().toLowerCase() ) {
      const normalizedEmail = data.email.trim().toLowerCase();
      const emailExists = this.repository.findByEmail( normalizedEmail );

      if (emailExists) {
        throw new ConflictError( "A contact already exists with this email address." );
      }
    }

    const updatedContact = this.repository.update(id, data);

    if (!updatedContact) {
      throw new NotFoundError("The contact with the requested ID does not exist.");
    }

    return ContactSerializer.serialize(updatedContact);
  }


    deleteContact(id: string) {
     const deleted = this.repository.delete(id);
        if (!deleted) {
          throw new NotFoundError( "The contact with the requested ID does not exist." );
        }

        return null;
    }
}