import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const Mongo = mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    });

export { Mongo };
