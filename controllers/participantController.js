import qrcode from "qrcode";
import mongoose from "mongoose";
import Participant from "../models/Participant.js";

// Register new participant
export const registerParticipant = async (req, res) => {
  try {
    const { name, email, phone, college, year } = req.body;

    const existing = await Participant.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const participant = await Participant.create({
      name,
      email,
      phone,
      college,
      year,
      qr_code_data: new mongoose.Types.ObjectId().toString(),
    });

    res.status(201).json(participant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate QR
export const getQrCode = async (req, res) => {
  try {
    const participant = await Participant.findOne({ id: req.params.id });
    if (!participant)
      return res.status(404).json({ message: "Participant not found" });

    const qrImage = await qrcode.toBuffer(participant.id);
    res.setHeader("Content-Type", "image/png");
    res.send(qrImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify participant
export const verifyParticipant = async (req, res) => {
  try {
    const { qr_data } = req.body;
    const participant = await Participant.findOne({ id: qr_data });
    if (!participant) return res.status(404).json({ message: "Invalid QR" });

    participant.verified = true;
    await participant.save();
    res.json(participant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all
export const getAllParticipants = async (_, res) => {
  const participants = await Participant.find({}, { _id: 0 });
  res.json(participants);
};

// Get one
export const getParticipantById = async (req, res) => {
  const participant = await Participant.findOne(
    { id: req.params.id },
    { _id: 0 }
  );
  if (!participant) return res.status(404).json({ message: "Not found" });
  res.json(participant);
};
