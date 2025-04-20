import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { allRoutes } from "./routes/router.js"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173/",
    credentials: true
}))
app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())

// mounted all routes 
app.use("/", allRoutes)

export { app }