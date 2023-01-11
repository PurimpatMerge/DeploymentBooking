import express from "express";
import { login, register,forgetPassword, resetPassword,resetPasswordafter } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/forgetPassword", forgetPassword)
router.get("/reset-Password/:id/:token", resetPassword)
router.post("/reset-Password/:id/:token", resetPasswordafter)

export default router