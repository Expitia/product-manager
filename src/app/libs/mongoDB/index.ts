import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI || "");
  } catch (error) {}
};

export default connectMongoDB;
