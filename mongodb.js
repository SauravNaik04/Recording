import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully Connected to Database");
  } catch (error) {
    console.log("Failed to Connect Database");
  }
};

export default connectMongoDB;
