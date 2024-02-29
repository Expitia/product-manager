import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    admin: Boolean,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default User;