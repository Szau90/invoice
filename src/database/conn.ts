import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
