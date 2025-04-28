import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./Database/db.js";


//import All Routes
import userRoutes from "./Routes/User.Route.js";
import courseRoutes from "./Routes/Course.Route.js";
import mediaRoutes from "./Routes/Media.Route.js";
import CoursePurchaseRoutes from "./Routes/CoursePurchase.Route.js";
import CourseProgressRoutes from "./Routes/CourseProgress.Route.js";
import CertificationsRoutes from "./Routes/Certifications.Route.js";
dotenv.config();
import path from "path";
connectDB();
const PORT = process.env.PORT || 8080;

const __dirname = path.resolve(); // Get the root directory

// Serve static files from the "Config/frontend_assets" folder
app.use("/assets", express.static(path.join(__dirname, "Config/frontend_assets/assets.js")));

// default middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        credentials: true
    }
));

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

// All Api
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/certifications",CertificationsRoutes);
app.use("/api/v1/media",mediaRoutes);
app.use("/api/v1/purchase",CoursePurchaseRoutes);
app.use("/api/v1/progress", CourseProgressRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});