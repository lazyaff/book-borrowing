import { Router } from "express";
import { check } from "./member.controller.js";

const memberRouter = Router();

memberRouter.get("/check", check);

export default memberRouter;
