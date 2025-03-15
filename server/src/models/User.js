import { model, Schema } from "mongoose";

/**
 * @typedef {Object} User
 * @property {string} token - JWT token from Google OAuth
 * @property {string} name - User's name
 * @property {string} [profile] - Profile image URL
 * @property {('user'|'rider'|'vendor'|'admin')} [role=user] - User's role
 * @property {string} [location] - User's location coordinates [lat, lon]
 * @property {Date} createdAt - Timestamp when the user was created
 * @property {Date} updatedAt - Timestamp when the user was last updated
 */

const UserSchema = new Schema(
    {
        token: { type: String, required: true }, // JWT token from Google OAuth
        name: { type: String, required: true },
        profile: { type: String }, // Profile image URL
        role: {
            type: String,
            enum: ["user", "rider", "vendor", "admin"],
            default: "user",
        },
        location: { type: String }, // User's location coordinates [lat, lon]
    },
    { timestamps: true }
);

export const User =  model("User", UserSchema);