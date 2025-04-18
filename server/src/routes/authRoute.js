import { Router } from "express";
import { googleAuth, LogIn, logout, authenticate } from "../controllers/authHandler.js";

const authRoute = Router();

authRoute.get("/", authenticate);
authRoute.get("/login", LogIn);
authRoute.get("/logout", logout);
authRoute.get("/google", googleAuth);

export default authRoute;