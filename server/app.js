import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.json({limit:"20kb"}))

app.use(express.urlencoded({extended:true, limit:"20kb"}))

app.use(express.static("public"))

app.use(cookieParser())

//routes import here
import userRouter from './routes/user.routes.js'
import workoutRouter from './routes/workout.routes.js'
import dietRouter from "./routes/diet.routes.js";
import aiRouter from "./routes/ai.routes.js";
import gymRouter from "./routes/gym.routes.js";




//routes declaration
app.use("/api/v1/users",userRouter) // (/api/v1 is just for convention for defining api and version for future updation)
app.use("/api/v1/workouts",workoutRouter)
app.use("/api/v1/diet",dietRouter);
app.use("/api/v1/ai",aiRouter);
app.use("/api/v1/gyms",gymRouter)
export {app}