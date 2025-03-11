import mongoose from "mongoose";



// Order Schema
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Laundry", required: true },
  rider: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional Rider
  status: { type: String, enum: ["pending", "accepted", "picked_up", "washing", "delivered", "completed", "canceled"], default: "pending" },
  otp: { type: String, required: true }, // OTP for security
  totalPrice: { type: Number, required: true },
  items: [{ name: String, quantity: Number, price: Number }], // Laundry Items
  pickupTime: { type: Date, required: true },
  dropTime: { type: Date },
}, { timestamps: true });


export const Order = mongoose.model("Order", orderSchema);