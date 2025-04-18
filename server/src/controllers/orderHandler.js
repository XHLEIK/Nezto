import { Order } from "../models/Order.js";
import { ApiResponse } from "../utils/helpers.js";
import mongoose from "mongoose";

/**
 * @description Create a new order
 * @route POST /api/order
 * @param {import('express').Request} req - Express request object containing order details in body
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} Response with created order
 */
async function createOrder(req, res) {
    const { price, type, user, vendor, pick_time, drop_time, otp } = req.body;
    if (price == null || !type || !user || !vendor || !pick_time || !drop_time || !otp) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const order = await Order.create({ price, type, user, vendor, pick_time, drop_time, otp, status: "pending" });
    return res.status(201).json(new ApiResponse(201, order, "Order created successfully"));
}

/**
 * @description Get all orders with populated user, vendor and rider details
 * @route GET /api/order
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} Response with array of orders
 */
async function getAllOrders(req, res) {
    const orders = await Order.find().populate("user", "name email").populate("vendor", "name email").populate("rider", "name email");
    return res.status(200).json(new ApiResponse(200, orders, "Orders fetched successfully"));
}



/**
 * @description Get a specific order by ID with populated user, vendor and rider details
 * @route GET /api/order/:id
 * @param {import('express').Request} req - Express request object containing order ID in params
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} Response with requested order
 */
async function getOrderById(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400).json(new ApiResponse(400, null, "Invalid order ID"));
        }
        const order = await Order.findById(id).populate("user", "name email").populate("vendor", "name email").populate("rider", "name email");
        if (!order) {
            return res.status(404).json(new ApiResponse(404, null, "Order not found"));
        }
        return res.status(200).json(new ApiResponse(200, order, "Order fetched successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Internal server error", error.message));
    }
}

/**
 * @description Update an order by ID
 * @route PUT /api/order/:id
 * @param {import('express').Request} req - Express request object containing order ID in params and update fields in body
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} Response with updated order
 */
async function updateOrderById(req, res) {
    const { id } = req.params;
    const { price, type, status, rider, pick_time, drop_time } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(new ApiResponse(400, null, "Invalid order ID"));
    }

    const order = await Order.findById(id);

    if (!order) {
        return res.status(404).json(new ApiResponse(404, null, "Order not found"));
    }

    // Update fields if provided
    if (price !== undefined) order.price = price;
    if (type !== undefined) order.type = type;
    if (status !== undefined) order.status = status;
    if (rider !== undefined) order.rider = rider;
    if (pick_time !== undefined) order.pick_time = pick_time;
    if (drop_time !== undefined) order.drop_time = drop_time;

    await order.save();

    return res.status(200).json(new ApiResponse(200, order, "Order updated successfully"));
}

/**
 * @description Delete an order by ID
 * @route DELETE /api/order/:id
 * @param {import('express').Request} req - Express request object containing order ID in params
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} Response indicating successful deletion
 */
async function deleteOrderById(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json(new ApiResponse(400, null, "Invalid order ID"));
        }
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json(new ApiResponse(404, null, "Order not found"));
        }
        return res.status(200).json(new ApiResponse(200, {}, "Order deleted successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Internal server error", error.message));
    }
}

export {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
};

