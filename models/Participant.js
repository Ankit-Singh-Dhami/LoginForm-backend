import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  name: String,
  email: String,
  phone: String,
  college: String,
  year: String,
  qr_code_data: String,
  verified: { type: Boolean, default: false },
  registered_at: { type: Date, default: Date.now },
});

export default mongoose.model("Participant", participantSchema);
