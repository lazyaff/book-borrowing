import { Router } from "express";
import { checkBook } from "./book.controller.js";

const bookRouter = Router();

bookRouter.get("/check", checkBook);

export default bookRouter;
