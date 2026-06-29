import { v4 as uuid } from "uuid";
import {ContactInput, UpdateContactInput} from "../validators/contact.schema";
import { Contact } from "../types/contact.types";
import { ContactRepository } from "../repositories/contact.repository";
import { ContactSerializer } from "../serializers/contact.serializer";
import { ConflictError, NotFoundError} from "../errors/custom-errors";


export class ContactService {
  private repository = new ContactRepository();

    async getAllContacts() {
        const contacts = this.repository.findAll();
        return ContactSerializer.serializeMany( contacts );
    }

    async getContactById(id: string) {
        const contact = this.repository.findById(id);

        if (!contact) {
        throw new NotFoundError("The contact with the requested ID does not exist." );
        }

        return ContactSerializer.serialize( contact);
    }


  async createContact( data: ContactInput) {
    const existingContact = this.repository.findByEmail( data.email );

    if (existingContact) {
      throw new ConflictError( "A contact already exists with this email address." );
    }

    const newContact: Contact = {
      id: uuid(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      internalNotes: "Created by system",
      createdAt: new Date(),
      updatedAt:new Date(),
      deletedAt: null,
      version: 1
    };

    const contact = this.repository.create( newContact  );

    return ContactSerializer.serialize( contact );
  }



  async updateContact( id: string,data: UpdateContactInput) {
    const existingContact = this.repository.findById(id);
    if (!existingContact) {
      throw new NotFoundError( "The contact with the requested ID does not exist." );
    }

    if (data.email && data.email !== existingContact.email ) {
      const emailExists = this.repository.findByEmail( data.email );

      if (emailExists) {
        throw new ConflictError( "A contact already exists with this email address." );
      }
    }

    const updatedContact =  this.repository.update(id,data);

    return ContactSerializer.serialize( updatedContact!);
  }


    async deleteContact(id: string) {
     const deleted = this.repository.delete(id);
        if (!deleted) {
          throw new NotFoundError( "The contact with the requested ID does not exist." );
        }

        return null;
    }
}