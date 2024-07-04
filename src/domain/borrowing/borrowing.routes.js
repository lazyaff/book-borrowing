import { Router } from "express";
import { borrowBook, returnBook } from "./borrowing.controller.js";

const borrowingRouter = Router();

borrowingRouter.post("/borrow", borrowBook);
borrowingRouter.post("/return", returnBook);

export default borrowingRouter;
