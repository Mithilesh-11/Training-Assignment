import { Router } from "express";
import { getContactStats } from "../controllers/reports.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// Returns: totalContacts, addedToday, mostCommonEmailDomain
router.get("/reports/contacts-stats", authenticateToken, getContactStats);

export default router;
