import { Request, Response, NextFunction } from "express";
import { ContactService } from "../services/contact.service";
import {contactSchema,updateContactSchema} from "../validators/contact.schema";
import { ValidationError } from "../errors/custom-errors";

export class ContactController {
  constructor(private service: ContactService) {}

  getAllContacts = (req: Request,res: Response,next: NextFunction) => {
    try {
      const contacts = this.service.getAllContacts();

      return res.status(200).json({
        success: true,
        data: contacts,
        error: null
      });
    } catch (error) {
      next(error);
    }
  };

  getContactById = (req: Request,res: Response,next: NextFunction) => {
    try {
    
    const { id } = req.params;

    if ( typeof id !== 'string') {
      throw new ValidationError("Invalid ID parameter provided.");
    }
      const contact = this.service.getContactById(id);

      return res.status(200).json({
        success: true,
        data: contact,
        error: null
      });
    } catch (error) {
      next(error);
    }
  };

  createContact = (req: Request,res: Response, next: NextFunction) => {
    try {
      const validation = contactSchema.safeParse(req.body);

      if (!validation.success) {
        throw new ValidationError(validation.error.issues.map((err) => err.message).join(", ")
        );
      }

      const contact = this.service.createContact(validation.data);

      return res.status(201).json({
        success: true,
        data: contact,
        error: null
      });
    } catch (error) {
      next(error);
    }
  };

  updateContact = ( req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = updateContactSchema.safeParse(req.body );

      if (!validation.success) {
        throw new ValidationError(
          validation.error.issues
            .map((err) => err.message)
            .join(", ")
        );
      }
      
      const { id } = req.params;

     if ( typeof id !== 'string') {
      throw new ValidationError("Invalid ID parameter provided.");
    }
      const contact = this.service.updateContact( id,validation.data);

      return res.status(200).json({
        success: true,
        data: contact,
        error: null
      });
    } catch (error) {
      next(error);
    }
  };

  deleteContact = (req: Request, res: Response, next: NextFunction ) => {
    try {   
     const { id } = req.params;
     if ( typeof id !== 'string') {
      throw new ValidationError("Invalid ID parameter provided.");
     }
      this.service.deleteContact(id);

      return res.status(200).json({
        success: true,
        data: null,
        error: null
      });
    } catch (error) {
      next(error);
    }
  };
}

