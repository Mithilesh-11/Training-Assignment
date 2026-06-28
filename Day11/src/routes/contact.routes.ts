import { Router } from "express";
import {getAllContacts,getContactById,createContact,updateContact,deleteContact,} from "../controllers/contact.controller";
import { authenticateToken , requireRole } from "../middleware/auth.middleware";

const router = Router();

router.get("/contacts", authenticateToken, requireRole(["admin"]), getAllContacts);
router.get("/contacts/:id", authenticateToken, getContactById);
router.post("/contacts", authenticateToken, createContact);
router.patch("/contacts/:id", authenticateToken, updateContact);
router.delete("/contacts/:id", authenticateToken, deleteContact);

export default router;
