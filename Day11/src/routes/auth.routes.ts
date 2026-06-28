import { Router } from "express";
import { register, login, refresh, logout, logoutAll } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);                            // reads cookie — no auth header needed
router.post("/logout-all", authenticateToken, logoutAll); // needs access token for userId

export default router;