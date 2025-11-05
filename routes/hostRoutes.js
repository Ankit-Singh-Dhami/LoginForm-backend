import express from "express";
import { loginHost } from "../controllers/hostController.js";

const router = express.Router();
router.post("/login", loginHost);

export default router;
