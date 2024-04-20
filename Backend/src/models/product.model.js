import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  description: {
    type: String,
    required: [true, "Password is required"],
  },
  rating: {
    type: String,
    default: "4.5",
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  otherImages: {
    type: Array,
  },
});

export const Product = mongoose.model("Product", productSchema);
