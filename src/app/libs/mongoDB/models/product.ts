import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    categoryId: String,
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;
