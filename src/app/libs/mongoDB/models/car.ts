import mongoose, { Schema } from "mongoose";

const CarsSchema = new Schema(
  {
    user: String,
    product: String,
    amount: Number,
  },
  {
    timestamps: true,
  }
);

const Cars = mongoose.models.Cars || mongoose.model("Cars", CarsSchema);

export default Cars;
