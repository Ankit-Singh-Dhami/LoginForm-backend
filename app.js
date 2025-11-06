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

import cors from "cors";

const allowedOrigins = process.env.CORS_ORIGINS.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors());

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
