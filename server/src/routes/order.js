import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
} from "../controllers/order.js";

const orderRouter = Router();

// Create a new order
orderRouter.post("/", createOrder);

// Get all orders
orderRouter.get("/", getAllOrders);

// Get order by id
orderRouter.get("/:id", getOrderById);

// Update order by id
orderRouter.put("/:id", updateOrderById);

// Delete order by id
orderRouter.delete("/:id", deleteOrderById);

export default orderRouter;