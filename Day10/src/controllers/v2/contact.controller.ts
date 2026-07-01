import { Request, Response, NextFunction } from "express";
import { ContactServiceV2 } from "../../services/v2/contact.service";
import {
  contactSchema,
  updateContactSchema,
  contactListQuerySchema,
} from "../../validators/v2/contact.schema";
import { ValidationError } from "../../errors/custom-errors";
import { sendSuccessResponse } from "../../utils/response";

export const createContactControllerV2 = (service: ContactServiceV2) => {
  // ─── GET /api/v2/contacts ──────────────────────────────────────────────
  const getAllContacts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validation = contactListQuerySchema.safeParse(req.query);
      if (!validation.success) {
        throw new ValidationError(
          validation.error.issues.map((e) => e.message).join(", ")
        );
      }

      const result = await service.getAllContacts(validation.data);

      sendSuccessResponse(res, 200, result.data, {
        pagination: {
          nextCursor: result.nextCursor,
          limit: result.limit,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // ─── GET /api/v2/contacts/:id ─────────────────────────────────────────
  const getContactById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (typeof id !== "string") {
        throw new ValidationError("Invalid ID parameter provided.");
      }

      const contact = await service.getContactById(id);

      sendSuccessResponse(res, 200, contact);
    } catch (error) {
      next(error);
    }
  };

  // ─── POST /api/v2/contacts ───────────────────────────────────────────
  const createContact = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validation = contactSchema.safeParse(req.body);
      if (!validation.success) {
        throw new ValidationError(
          validation.error.issues.map((e) => e.message).join(", ")
        );
      }

      const contact = await service.createContact(validation.data);

      sendSuccessResponse(res, 201, contact);
    } catch (error) {
      next(error);
    }
  };

  // ─── PATCH /api/v2/contacts/:id ───────────────────────────────────────
  const updateContact = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validation = updateContactSchema.safeParse(req.body);
      if (!validation.success) {
        throw new ValidationError(
          validation.error.issues.map((e) => e.message).join(", ")
        );
      }

      const { id } = req.params;
      if (typeof id !== "string") {
        throw new ValidationError("Invalid ID parameter provided.");
      }

      const contact = await service.updateContact(id, validation.data);

      sendSuccessResponse(res, 200, contact);
    } catch (error) {
      next(error);
    }
  };

  // ─── DELETE /api/v2/contacts/:id ────────────────────────────────────
  const deleteContact = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (typeof id !== "string") {
        throw new ValidationError("Invalid ID parameter provided.");
      }

      await service.deleteContact(id);

      sendSuccessResponse(res, 200, null);
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
