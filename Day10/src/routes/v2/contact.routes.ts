import { Router } from "express";
import { createContactControllerV2 } from "../../controllers/v2/contact.controller";
import { ContactServiceV2 } from "../../services/v2/contact.service";

export const createContactRoutesV2 = (service: ContactServiceV2) => {
  const router = Router();
  const controller = createContactControllerV2(service);

  // GET    /api/v2/contacts                  — list with cursor pagination, search, sort
  // GET    /api/v2/contacts/:id              — get single contact
  // POST   /api/v2/contacts                  — create contact
  // PATCH  /api/v2/contacts/:id             — update contact (audit logged)
  // DELETE /api/v2/contacts/:id             — soft-delete contact (audit logged)

  router.get("/contacts", controller.getAllContacts);
  router.get("/contacts/:id", controller.getContactById);
  router.post("/contacts", controller.createContact);
  router.patch("/contacts/:id", controller.updateContact);
  router.delete("/contacts/:id", controller.deleteContact);

  return router;
};

export default createContactRoutesV2;
