import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./Database/db.js";
import { fileURLToPath } from "url";
import path from "path";


//import All Routes
import userRoutes from "./Routes/User.Route.js";
import courseRoutes from "./Routes/Course.Route.js";
import mediaRoutes from "./Routes/Media.Route.js";
import CoursePurchaseRoutes from "./Routes/CoursePurchase.Route.js";
import CourseProgressRoutes from "./Routes/CourseProgress.Route.js";
import CertificationsRoutes from "./Routes/Certifications.Route.js";
dotenv.config({});

connectDB();
const PORT = process.env.PORT || 8080;

 // Get the root directory
// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Serve static files from the "Config/frontend_assets" folder
app.use("/frontend_assets", express.static(path.join(__dirname, "backendassets/frontend_assets")));
// default middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ["https://lms-5-far4.onrender.com"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));


// All Api
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/certifications",CertificationsRoutes);
app.use("/api/v1/media",mediaRoutes);
app.use("/api/v1/purchase",CoursePurchaseRoutes);
app.use("/api/v1/progress", CourseProgressRoutes);

// Serve static files from the "uploads" directory
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname,"/client/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});