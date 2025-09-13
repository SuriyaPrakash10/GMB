import express from "express";
import { signup, login, forgotPassword, changePassword, logout } from "../Controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", authMiddleware, changePassword);
router.post("/logout", logout);

export default router;
