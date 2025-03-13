import { google } from "../config.js";

// Google Auth to get user info
async function fetch_google_user(_token) {
    try {
        const _response = await axios.get(`${google.user_profile}?access_token=${_token}`);
        return _response.data;
    } catch (error) {
        console.error('OAuth token error:', error.response?.data || error.message);
        return null;
    }
}


/**
 * Handles Google OAuth authentication
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>} Promise that resolves when authentication is complete
 * @description
 * This function processes Google OAuth authentication requests.
 * It validates the authentication token and creates/updates user sessions.
 * 
 * Expected request query:
 * - code: Google OAuth token
 * 
 * Response:
 * - 200: Successfully authenticated
 * - 401: Invalid authentication
 * - 500: Server error
 * ```
 * import {googleAuth} from '@/controllers/authentication.js'
 * import 
 * ```
 */
export async function googleAuth(req, res) {
    try {
        const { code } = req.query;
        // if unable to find code in query
        if (!code) {
            res.status(401).json({ message: 'Invalid authentication' });
            return;
        }
        const _data = {
            code,
            client_id: google.client_id,
            client_secret: google.client_secret,
            redirect_uri:  `${req.protocol}://${req.get('host')}${google.redirect_uris[0]}`,
            grant_type: 'authorization_code'
        }
        const _response = await fetch(google.token_url, {
            method : "POST",
            body : new URLSearchParams(_data)
        })
        const _json = await _response.json()
        const _user = await fetch_google_user(_json.access_token);
        // if unable to find user from google Oauth api
        if (!_user){
            res.status(401).json({ message: 'Invalid authentication' });
            return;
        }
        res.status(200).json(_user)
        return;
        
    } catch (error) {
        res.status(500).json({code : 500, message : "server error", error : error.message || ""})
        return;
    }
}
