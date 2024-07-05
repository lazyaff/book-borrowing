import { Mongo } from "./database.js";
import express from "express";
import cors from "cors";
import Routes from "./routes.js";

const createServer = () => {
    // create instance of express
    const app = express();

    // connect to database
    Mongo;

    // enable cors and json
    app.use(cors());
    app.use(express.json());
    app.use(Routes);

    return app;
};

export default createServer;
