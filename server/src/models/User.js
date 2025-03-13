import { model, Schema } from "mongoose";


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
      location: {
        type :String,
        required: true,
      }, // x and y cordinates
    },
    { timestamps: true }
  );



export const User = model("User", UserSchema);