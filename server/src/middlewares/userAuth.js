import { verifyJWT } from "../utils/helpers.js";

/**
 * @description roleBased middleware for user authentication
 * @param {String} role - User role to check <admin, user, vendor, rider>
* @returns {Function} Middleware function
    * @example
    * import { hasRole } from "../middlewares/userAuth.js"
    * import { Router } from "express";
    * const router = Router();
    * router.get("/admin", hasRole("admin"), (req, res) => {
    *   res.json({ message: "Hello Admin" });
    * });
    * 
 */
export function hasRole(role="user"){
    /**
     * @description middleware for user authentication
     * @param {import('express').Request} req
     * @param {import("express").Response} res
     * @param {Function} next
     */
    return function (req, res, next){
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
         // verify JWT token
         // if token is invalid or expired, it will return null
         // if token is valid, it will return user object
        const user = verifyJWT(token);
        if (!user) {
            return res.status(401).json({ message: "Forbidden" });
        }
        if (user.role !== role) {
            return res.status(403).json({ error : "Unauthorised", message: `User doesn't have ${role} perm to access this resource!!` });
        }
        next();
    }
}


// middleware for private routes to vendor 
/**
 * 
 * @param {import('express').Request} req express request object
 * @param {import("express").Response} res express response object
 * @param {Function} next express next function
 * @returns 
 */
export function isVendor(req, res, next) {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // verify JWT token
    // if token is invalid or expired, it will return null
    // if token is valid, it will return user object
    const user = verifyJWT(token);
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.role !== "vendor") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}


// middleware for private routes to rider
/**
 * @description middleware for private routes to rider
 * @param {import('express').Request} req express request object
 * @param {import("express").Response} res express response object
 * @param {Function} next express next function
 * @returns 
 */
export function isRider(req, res, next) {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // verify JWT token
    // if token is invalid or expired, it will return null
    // if token is valid, it will return user object
    const user = verifyJWT(token);
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.role !== "rider") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}