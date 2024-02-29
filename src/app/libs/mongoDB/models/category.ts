import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Categories || mongoose.model("Categories", CategorySchema);

export default Category;
