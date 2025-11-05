import express from "express";
import {
  registerParticipant,
  getQrCode,
  verifyParticipant,
  getAllParticipants,
  getParticipantById,
} from "../controllers/participantController.js";

const router = express.Router();

router.post("/register", registerParticipant);
router.get("/qr/:id", getQrCode);
router.post("/verify", verifyParticipant);
router.get("/participants", getAllParticipants);
router.get("/participant/:id", getParticipantById);

export default router;
