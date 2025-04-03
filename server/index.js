import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./Database/db.js";
//import All Routes
import userRoutes from "./Routes/User.Route.js";
import courseRoutes from "./Routes/Course.Route.js";
dotenv.config();
connectDB();
const PORT = process.env.PORT || 8080;

// default middlewares
app.use(express.json());

app.use(cors(
    {
        origin: ["http://localhost:5173"],
        credentials: true
    }
));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Hello, World!");
})

// All Api
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/course",courseRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});