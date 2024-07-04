import { Router } from "express";
import memberRouter from "./domain/member/member.routes.js";
import bookRouter from "./domain/book/book.routes.js";

const Routes = Router();

Routes.use("/member", memberRouter);
Routes.use("/book", bookRouter);

export default Routes;
