import bcrypt from "bcrypt";
import Host from "../models/Host.js";
import { createToken } from "../utils/token.js";

// Host login
export const loginHost = async (req, res) => {
  const { username, password } = req.body;

  const host = await Host.findOne({ username });
  if (!host) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, host.password_hash);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = createToken({ id: host._id, username: host.username });
  res.json({ token, name: host.name });
};

// Initialize default admin
export const initDefaultHost = async () => {
  const existing = await Host.findOne({ username: "admin" });
  if (!existing) {
    const hash = await bcrypt.hash("admin123", 10);
    await Host.create({
      username: "admin",
      password_hash: hash,
      name: "Admin Host",
    });
    console.log("✅ Default host created: admin / admin123");
  }
};
