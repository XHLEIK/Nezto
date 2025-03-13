import { Router } from "express";
import { googleAuth, LogIn } from "../controllers/authentication.js";

const auth = Router();

auth.get("/login", LogIn);
auth.get("/google", googleAuth);

export default auth;