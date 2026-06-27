import { Router } from "express";
import { getAllContacts, getContactById,createContact,updateContact,deleteContact, } from "../controllers/contact.controller";

const router = Router();

router.get("/contacts",getAllContacts);
router.get( "/contacts/:id", getContactById);
router.post("/contacts",createContact);
router.patch( "/contacts/:id", updateContact);
router.delete("/contacts/:id",deleteContact
);

export default router;