import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import participantRoutes from "./routes/participantRoutes.js";
import hostRoutes from "./routes/hostRoutes.js";
import { initDefaultHost } from "./controllers/hostController.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGINS.split(","),
    credentials: true,
  })
);

// Connect to DB
connectDB();

// Create default admin
initDefaultHost();

// Routes
app.use("/api", participantRoutes);
app.use("/api/host", hostRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
