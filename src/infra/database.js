import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const Mongo = mongoose.connect(process.env.MONGO_URL);

export { Mongo };
