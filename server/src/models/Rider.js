import mongoose from "mongoose";

// Rider Schema (Optional)
const riderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vehicleType: { type: String, enum: ["bike", "scooter", "car"], required: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });


export const Rider = mongoose.model("Rider", riderSchema);