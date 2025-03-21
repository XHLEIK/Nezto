import { google } from "../config.js";


/**
 * Fetch user profile from Google OAuth API
 * @param {import('express').Request} req - grant callback code
 * @returns {Promise<import('./_types.js').GoogleUser>} User profile from Google OAuth API
 * @description
 * This function fetches user profile from Google OAuth API.
 */
export async function fetch_google_user(req) {
    try {
        const _payload = {
            code: req.query.code,
            client_id: google.client_id,
            client_secret: google.client_secret,
            redirect_uri: `${req.protocol}://${req.get('host')}${google.redirect_uris[0]}`,
            grant_type: 'authorization_code'
        }

        // fetching access token
        let _response = await fetch(google.token_url, {
            method: "POST",
            body: new URLSearchParams(_payload)
        })

        // contains access token
        const _json = await _response.json()

        // if unable to find access
        if (!_json.access_token) {
            console.error('OAuth token error:', _json.error_description || _json.error);
            return null;
        }
        // reusing the same response object to validate user profile
        _response = await fetch(`${google.user_profile}?access_token=${_json.access_token}`);

        // user profile data
        const _data = await _response.json();
        return _data;

    } catch (error) {
        console.error('OAuth token error:', error.response?.data || error.message);
        return null;
    }
}


/**
 * @description Get user token from request
 * @param {import('express').Request} req 
 * @returns {string | null} User token
 */
export function get_user_token(req) {
    try {
        if (!req.cookies.token && (!req.headers.authorization || !req.headers.authorization?.startsWith('Bearer'))) return null;
        return req.cookies.token || req.headers.authorization.split(' ')[1];
    } catch (error) {
        console.error('Error in get_user_token:', error.message);
        return null;
    }
}