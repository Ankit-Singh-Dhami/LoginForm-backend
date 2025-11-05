import mongoose from "mongoose";

const hostSchema = new mongoose.Schema({
  username: String,
  password_hash: String,
  name: String,
});

export default mongoose.model("Host", hostSchema);
