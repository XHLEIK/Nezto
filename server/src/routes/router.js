import auth from "./auth.js"
import { Router } from "express"
import { google_auth_url } from "../config.js";

export const allRoutes = Router();

allRoutes.get("/", (req, res) => {
    res.json({ message : google_auth_url(req) });
})

allRoutes.use("/auth", auth)