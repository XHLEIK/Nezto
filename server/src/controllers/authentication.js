import { google, google_auth_url } from "../config.js";
import { User } from "../models/User.js";


/**
 * Fetch user profile from Google OAuth API
 * @param {String} token - grant callback code
 * @returns {import('../utils/_types.js').GoogleUser} User profile from Google OAuth API
 * @description
 * This function fetches user profile from Google OAuth API.
 */
async function fetch_google_user(token) {
    try {
        const _response = await fetch(`${google.user_profile}?access_token=${token}`);
        const _json = await _response.json();
        return {_json, access_token : token};
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
        const location = req.get("geolocation") || req.query.geolocation || null;
        const { code } = req.query;
        // if unable to find code in query
        if (!code) {
            res.status(401).json({ message: 'Invalid authentication', error : "code not found in query" });
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
        // if user already exists in database
        const _userExists = await User.findOne({ email : _user.email });
        if (_userExists){
            _userExists.token = _user.access_token;
            await _userExists.save();
            res.status(200).json(_userExists)
            return;
        }
        // if user does not exist in database
        const _newUser = new User({
            email : _user.email,
            name : _user.name,
            token : _json.access_token,
            role : "user",
            location : location
        })
        await _newUser.save();


        res.status(200).json(_user)
        return;
        
    } catch (error) {
        res.status(500).json({code : 500, message : "server error", error : error.message || ""})
        return;
    }
}


export async function LogIn(req,res){
    res.redirect(google_auth_url);
}