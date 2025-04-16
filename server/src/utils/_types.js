

export class GoogleUser{
      constructor(obj){
            this.sub = BigInt(obj.sub);
            this.name = String(obj.name || "");
            this.given_name = String(obj.given_name || "");
            this.picture = String(obj.picture || "");
            this.email = String(obj.email || "");
            this.access_token = String(obj.access_token || "");
            this.email_verified = Boolean(obj.email_verified || false);
      }
}


/**
 * Class representing a JWT User.
 */
export class JwtUser {
    /**
     * Create a JWT User.
     * @param {import('../models/User').User} obj - The user object.
     * @param {string} obj._id - The unique identifier of the user.
     * @param {string} obj.email - The email address of the user.
     * @param {string} obj.name - The name of the user.
     * @param {string} obj.role - The role of the user.
     * @param {string} obj.picture - The profile of the user.
     * @param {Date} obj.createdAt - The creation date of the user.
     * @param {Date} obj.updatedAt - The last update date of the user.
     */
    constructor(obj) {
        this._id = String(obj._id || "");
        this.email = String(obj.email || "");
        this.name = String(obj.name || "");
        this.role = String(obj.role || "");
        this.picture = String(obj.picture || "");
        this.createdAt = Date(obj.createdAt || new Date());
        this.updatedAt = Date(obj.updatedAt || new Date());
    }
}


export class LaundryService{
      constructor(obj){
            this.name = String(obj.name || "");
            this.description = String(obj.description || "");
            this.location = String(obj.location || "");
            this.services = Array.isArray(obj.services) ? obj.services : [];
            this.rating = Number(obj.rating || 0);
            this.status = Boolean(obj.status || false);
            this.createdAt = Date(obj.createdAt || new Date());
            this.updatedAt = Date(obj.updatedAt || new Date());
      }
}