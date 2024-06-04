import * as dotenv from "dotenv";
import { Mongo } from "./infra/database.js";
import express from "express";
import cors from "cors";

// create instance of express
const app = express();

// connect to database
Mongo;

// enable cors and json
app.use(cors());
app.use(express.json());

// start server
dotenv.config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.json({
        message: "Hello, world!",
    });
});
