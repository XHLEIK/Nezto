// filepath: d:\github\Nezto\server\src\routes\laundry.js
import { Router } from "express";
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

// Middleware imports (assuming you have authentication middleware)
// import { authenticate, authorizeOwner } from "../middlewares/auth.js";

const laundryRouter = Router();

// Public routes
laundryRouter.get("/", getAllLaundryServices);
laundryRouter.get("/nearby", getNearbyLaundryServices);
laundryRouter.get("/:id", getLaundryServiceById);

// Protected routes - requiring authentication
// Replace the comments with actual middleware when it's implemented
// laundryRouter.post("/", authenticate, createLaundryService);
// laundryRouter.put("/:id", authenticate, updateLaundryService);
// laundryRouter.delete("/:id", authenticate, deleteLaundryService);
// laundryRouter.patch("/:id/rating", authenticate, updateLaundryRating);
// laundryRouter.patch("/:id/toggle-status", authenticate, toggleLaundryServiceStatus);

// Temporary routes without authentication for development
laundryRouter.post("/", createLaundryService);
laundryRouter.put("/:id", updateLaundryService);
laundryRouter.delete("/:id", deleteLaundryService);
laundryRouter.patch("/:id/rating", updateLaundryRating);
laundryRouter.patch("/:id/toggle-status", toggleLaundryServiceStatus);

export default laundryRouter;