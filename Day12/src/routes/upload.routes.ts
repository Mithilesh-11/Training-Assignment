import { Router } from "express";
import { uploadProfile, uploadDocument } from "../controllers/upload.controller.js";
import { uploadProfileMiddleware, uploadDocumentMiddleware } from "../middlewares/upload.middleware.js";

const router = Router();

// Look how much cleaner this is!
router.post("/profile", uploadProfileMiddleware, uploadProfile);
router.post("/document", uploadDocumentMiddleware, uploadDocument);


export default router;