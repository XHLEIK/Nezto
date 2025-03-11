import mongoose from "mongoose";


// vendor Schema
const vendorSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  status: { type: Boolean, default: true }, // Active or Inactive
}, { timestamps: true });


export const Laundry = mongoose.model("Laundry", vendorSchema);