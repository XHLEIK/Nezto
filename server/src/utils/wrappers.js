


/**
 * Transforms a user object into a JWT user object.
 *
 * @param {Object} user - The user object to transform.
 * @param {string} user.name - The name of the user.
 * @param {string} user.role - The role of the user.
 * @param {string} user.picture - The picture URL of the user.
 * @param {Date} user.createdAt - The creation date of the user.
 * @param {Date} user.updatedAt - The last update date of the user.
 * @returns {import('./_types').JwtUser} The transformed JWT user object.
 */
export function jwtUser(user) {
    return {
        name: user.name,
        role: user.role,
        picture: user.picture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}