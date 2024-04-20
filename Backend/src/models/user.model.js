import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowecase: true,
    trim: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phonenumber: {
    type: Number,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
  },
});

export const User = mongoose.model("User", userSchema);
