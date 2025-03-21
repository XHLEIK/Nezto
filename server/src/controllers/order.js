import { Order } from "../models/Order";
import { get_user_token } from "../utils/helpers";

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function createOrder(req, res){
    // suppose to create a new order if laundry status is open(true)
}