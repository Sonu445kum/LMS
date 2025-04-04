import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { createCourse, getAllAdminCourses } from "../Controllers/Course.Controller.js";
const router = express.Router();
//import controller functionality here

//routes
router.route("/create").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getAllAdminCourses);

export default router;