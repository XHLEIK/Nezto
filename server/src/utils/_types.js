

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
     * @param {string} obj.name - The name of the user.
     * @param {string} obj.role - The role of the user.
     * @param {string} obj.profile - The profile of the user.
     * @param {Date} obj.createdAt - The creation date of the user.
     * @param {Date} obj.updatedAt - The last update date of the user.
     */
    constructor(obj) {
        this.name = String(obj.name || "");
        this.role = String(obj.role || "");
        this.profile = String(obj.profile || "");
        this.createdAt = Date(obj.createdAt || new Date());
        this.updatedAt = Date(obj.updatedAt || new Date());
    }
}
export class JwtUser{
      constructor(obj){
            this.name = String(obj.name || "");
            this.role = String(obj.role || "");
            this.profile = String(obj.profile || "");
            this.createdAt = Date(obj.createdAt || new Date());
            this.updatedAt = Date(obj.updatedAt || new Date());
      }
}