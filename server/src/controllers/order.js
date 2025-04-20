import { Order } from "../models/Order";
import { get_user_token, verifyJWT } from "../utils/helpers";

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function createOrder(req, res){
    const user = verifyJWT(get_user_token(req));
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const orderPayload = req.body;
    // required a little information about pricing and few other things
}