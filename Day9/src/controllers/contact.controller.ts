import { Request, Response, NextFunction } from "express";
import { ContactService } from "../services/contact.service";
import {contactSchema,updateContactSchema} from "../validators/contact.schema";
import { ValidationError } from "../errors/custom-errors";

export class ContactController {
  constructor(private service: ContactService) {}

  getAllContacts = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    try {
      const contacts = await this.service.getAllContacts();

      res.status(200).json({
        success: true,
        data: contacts,
        error: null
      });
    } catch (error) {
      next(error);
    }
  };

  getContactById = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    try {
    
    const { id } = req.params;

    if ( typeof id !== 'string') {
      throw new ValidationError("Invalid ID parameter provided.");
    }
      const contact = await this.service.getContactById(id);

      res.status(200).json({
        success: true,
        data: contact,
        error: null
      });
    } catch (error) {
      next(error);
    }
  };

  createContact = async (req: Request,res: Response, next: NextFunction): Promise<void> => {
    try {
      const validation = contactSchema.safeParse(req.body);

      if (!validation.success) {
        throw new ValidationError(validation.error.issues.map((err) => err.message).join(", ")
        );
      }

      const contact = await this.service.createContact(validation.data);

      res.status(201).json({
        success: true,
        data: contact,
        error: null
      });
    } catch (error) {
      next(error);
    }
  };

  updateContact = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
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
      const contact = await this.service.updateContact( id,validation.data);

      res.status(200).json({
        success: true,
        data: contact,
        error: null
      });
    } catch (error) {
      next(error);
    }
  };

  deleteContact = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {   
     const { id } = req.params;
     if ( typeof id !== 'string') {
      throw new ValidationError("Invalid ID parameter provided.");
     }
      await this.service.deleteContact(id);

      res.status(200).json({
        success: true,
        data: null,
        error: null
      });
    } catch (error) {
      next(error);
    }
  };
}

