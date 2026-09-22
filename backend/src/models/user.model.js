import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    passwordHash: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "seller"],
    },
    accessToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const userModel = mongoose.model("users", userSchema);
export default userModel;
