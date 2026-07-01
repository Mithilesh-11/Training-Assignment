import { Router } from "express";
import { getContactStats } from "../../controllers/v2/reports.controller";

const router = Router();

// GET /api/v2/reports/contacts-stats
// Returns: totalContacts, addedToday, mostCommonEmailDomain
router.get("/reports/contacts-stats", getContactStats);

export default router;
