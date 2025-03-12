export const DB_NAME = "NeztoDB"

export const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
}

export const google = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    token_url: `https://oauth2.googleapis.com/token`,
    user_profile : "https://www.googleapis.com/oauth2/v3/userinfo",
    redirect_uris: ["/api/auth/callback"]
}