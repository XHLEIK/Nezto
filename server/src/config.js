import { configDotenv } from "dotenv";
console.log(configDotenv({path : ".env"}).parsed);


export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017"
console.log(MONGO_URI)
export const PORT = process.env.PORT || 8000;

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