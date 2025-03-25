import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./Database/db.js";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hello, World!");
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});