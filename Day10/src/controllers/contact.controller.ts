import { Request, Response, NextFunction } from "express";
import { ContactService } from "../services/contact.service";
import { contactSchema, updateContactSchema } from "../validators/contact.schema";
import { ValidationError } from "../errors/custom-errors";
import { sendSuccessResponse } from "../utils/response";

export const createContactController = (service: ContactService) => {
  const getAllContacts = (req: Request, res: Response, next: NextFunction) => {
    try {
      const contacts = service.getAllContacts();

      return sendSuccessResponse(res, 200, contacts);
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

      return sendSuccessResponse(res, 200, contact);
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

      return sendSuccessResponse(res, 201, contact);
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

      return sendSuccessResponse(res, 200, contact);
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

      return sendSuccessResponse(res, 200, null);
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


