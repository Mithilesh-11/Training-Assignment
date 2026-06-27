import { Router } from "express";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "../../controllers/v2/contact.controller";

const router = Router();

// GET    /api/v2/contacts                  — list with cursor pagination, search, sort
// GET    /api/v2/contacts/:id              — get single contact
// POST   /api/v2/contacts                  — create contact
// PATCH  /api/v2/contacts/:id             — update contact (audit logged)
// DELETE /api/v2/contacts/:id             — soft-delete contact (audit logged)

router.get("/contacts", getAllContacts);
router.get("/contacts/:id", getContactById);
router.post("/contacts", createContact);
router.patch("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

export default router;
