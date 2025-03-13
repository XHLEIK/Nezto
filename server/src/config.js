import { configDotenv } from "dotenv";
configDotenv({path : ".env"});


export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017"
export const PORT = process.env.PORT || 8000; //prefer 8000 for now
export const origin = "http://localhost:"+ PORT;


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
    redirect_uris: ["/auth/google"],
}


export const google_auth_url = `https://accounts.google.com/o/oauth2/auth?client_id=${google.client_id}&redirect_uri=${origin}/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile`
console.log(google_auth_url);