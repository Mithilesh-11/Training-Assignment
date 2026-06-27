import { Request, Response, NextFunction } from "express";
import { ContactServiceV2 } from "../../services/v2/contact.service";
import { contactSchema, updateContactSchema, contactListQuerySchema } from "../../validators/v2/contact.schema";
import { ValidationError } from "../../errors/custom-errors";

const service = new ContactServiceV2();

// ─── GET /api/v2/contacts ────────────────────────────────────────────────
export const getAllContacts = async (
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

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: {
        nextCursor: result.nextCursor,
        limit: result.limit,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/v2/contacts/:id ────────────────────────────────────────────
export const getContactById = async (
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

    res.status(200).json({ success: true, data: contact, error: null });
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/v2/contacts ───────────────────────────────────────────────
export const createContact = async (
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

    res.status(201).json({ success: true, data: contact, error: null });
  } catch (error) {
    next(error);
  }
};

// ─── PATCH /api/v2/contacts/:id ──────────────────────────────────────────
export const updateContact = async (
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

    res.status(200).json({ success: true, data: contact, error: null });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/v2/contacts/:id ─────────────────────────────────────────
export const deleteContact = async (
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

    res.status(200).json({ success: true, data: null, error: null });
  } catch (error) {
    next(error);
  }
};
