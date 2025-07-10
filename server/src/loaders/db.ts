import mongoose from "mongoose";
import config from "../config";
import logger from "../utils/logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URL+`/${config.DB_NAME}`);
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('DB connection failed', err);
    process.exit(1);
  }
};