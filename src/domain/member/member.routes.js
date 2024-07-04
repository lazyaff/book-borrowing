import { Router } from "express";
import { checkMember } from "./member.controller.js";

const memberRouter = Router();

memberRouter.get("/check", checkMember);

export default memberRouter;
