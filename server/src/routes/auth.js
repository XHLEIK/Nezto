import { Router } from "express";
import { googleAuth, LogIn, logout, authenticate } from "../controllers/authentication.js";

const auth = Router();

auth.get("/", authenticate);
auth.get("/login", LogIn);
auth.get("/logout", logout);
auth.get("/google", googleAuth);

export default auth;