import { verifyJWT } from "../utils/helpers.js";

/**
 * @description roleBased middleware for user authentication
 * @param {String} role - User role to check <admin, user, vendor, rider>
* @returns {Function} Middleware function
 */
export function hasRole(role="user"){
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
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (user.role !== role) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    }
}
