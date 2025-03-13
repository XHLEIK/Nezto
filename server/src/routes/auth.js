import { Router } from "express";
import { googleAuth } from "../controllers/authentication.js";

const auth = Router();

auth.get("/google", googleAuth);

export default auth;