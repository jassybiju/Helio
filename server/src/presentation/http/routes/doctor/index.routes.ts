import { Router } from "express";
import { doctorAuthRouter } from "./auth.routes.ts";
import { doctorProfileRouter } from "./profile.routes.ts";

export const doctorRouter = Router();

doctorRouter.use("/auth", doctorAuthRouter);
doctorRouter.use("/profile", doctorProfileRouter);
