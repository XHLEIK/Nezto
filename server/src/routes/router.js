import auth from "./auth.js"
import { Router } from "express"

export const allRoutes = Router();
allRoutes.use("/auth", auth)