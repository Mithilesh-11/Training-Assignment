import { Router } from "express";
import { createContactController } from "../controllers/contact.controller";
import { ContactService } from "../services/contact.service";

export const createContactRoutes = (service: ContactService) => {
  const router = Router();
  const controller = createContactController(service);

  router.get("/contacts", controller.getAllContacts);
  router.get("/contacts/:id", controller.getContactById);
  router.post("/contacts", controller.createContact);
  router.patch("/contacts/:id", controller.updateContact);
  router.delete("/contacts/:id", controller.deleteContact);

  return router;
};

export default createContactRoutes;