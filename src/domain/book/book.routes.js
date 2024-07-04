import { Router } from "express";
import { check } from "./book.controller.js";

const bookRouter = Router();

bookRouter.get("/check", check);

export default bookRouter;
