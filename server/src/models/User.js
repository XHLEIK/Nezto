import mongoose from "mongoose";


// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  token: { type: String, required: true }, // Google OAuth Token (JWT)
  profile: { type: String, default: "" }, // Profile Image URL
  role: { type: String, enum: ["user", "rider", "vendor", "admin"], required: true },
}, { timestamps: true });



export const User = mongoose.model("User", userSchema);

