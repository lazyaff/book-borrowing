import { Router } from "express";
import memberRouter from "./domain/member/member.routes.js";

const Routes = Router();

Routes.use("/member", memberRouter);

export default Routes;
