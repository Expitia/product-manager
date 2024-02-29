import mongoose, { Schema } from "mongoose";

const FavoriteSchema = new Schema(
  {
    user: String,
    product: String,
  },
  {
    timestamps: true,
  }
);

const Favorite =
  mongoose.models.Favorites || mongoose.model("Favorites", FavoriteSchema);

export default Favorite;
