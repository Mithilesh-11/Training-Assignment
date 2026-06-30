import { Request, Response, NextFunction } from "express";
import { ContactService } from "../services/contact.service";
import { contactSchema, updateContactSchema } from "../validators/contact.schema";
import { ValidationError } from "../errors/custom-errors";

export const createContactController = (service: ContactService) => {
  const getAllContacts = (req: Request, res: Response, next: NextFunction) => {
    try {
      const contacts = service.getAllContacts();

      return res.status(200).json({
        success: true,
        data: contacts,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  const getContactById = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        throw new ValidationError("Invalid ID parameter provided.");
      }

      const contact = service.getContactById(id);

      return res.status(200).json({
        success: true,
        data: contact,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  const createContact = (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = contactSchema.safeParse(req.body);

      if (!validation.success) {
        throw new ValidationError(
          validation.error.issues.map((err) => err.message).join(", ")
        );
      }

      const contact = service.createContact(validation.data);

      return res.status(201).json({
        success: true,
        data: contact,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  const updateContact = (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = updateContactSchema.safeParse(req.body);

      if (!validation.success) {
        throw new ValidationError(
          validation.error.issues.map((err) => err.message).join(", ")
        );
      }

      const { id } = req.params;

      if (typeof id !== "string") {
        throw new ValidationError("Invalid ID parameter provided.");
      }

      const contact = service.updateContact(id, validation.data);

      return res.status(200).json({
        success: true,
        data: contact,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  const deleteContact = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (typeof id !== "string") {
        throw new ValidationError("Invalid ID parameter provided.");
      }

      service.deleteContact(id);

      return res.status(200).json({
        success: true,
        data: null,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  return {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
  };
};


