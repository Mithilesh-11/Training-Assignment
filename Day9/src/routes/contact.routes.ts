import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import { ContactService } from "../services/contact.service";

const router = Router();

// Initialize service and controller with dependency injection
const contactService = new ContactService();
const contactController = new ContactController(contactService);

router.get("/contacts", contactController.getAllContacts);
router.get( "/contacts/:id", contactController.getContactById);
router.post("/contacts", contactController.createContact);
router.patch( "/contacts/:id", contactController.updateContact);
router.delete("/contacts/:id", contactController.deleteContact);

export default router;