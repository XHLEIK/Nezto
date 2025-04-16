
import { Router } from "express";
import {hasRole} from "../middlewares/userAuth.js";
import {
  getAllLaundryServices,
  getLaundryServiceById,
  createLaundryService,
  updateLaundryService,
  deleteLaundryService,
  getNearbyLaundryServices,
  updateLaundryRating,
  toggleLaundryServiceStatus
} from "../controllers/laundry.js";

const laundryRouter = Router();

// Public routes
laundryRouter.get("/", getAllLaundryServices);
laundryRouter.get("/nearby", getNearbyLaundryServices);
laundryRouter.get("/:id", getLaundryServiceById);

// Protected routes - requiring base authentication
laundryRouter.post("/", hasRole('user'),  createLaundryService);
laundryRouter.put("/:id", hasRole('vendor'), updateLaundryService);
laundryRouter.delete("/:id", hasRole('vendor'), deleteLaundryService);
laundryRouter.patch("/:id/rating", hasRole('vendor'), updateLaundryRating);
laundryRouter.patch("/:id/toggle-status", hasRole('user'),  toggleLaundryServiceStatus);

export default laundryRouter;