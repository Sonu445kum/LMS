import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { createCourse, editCourse, getAllAdminCourses, getCourseById } from "../Controllers/Course.Controller.js";
import upload from "../Utils/Multer.js";
const router = express.Router();
//import controller functionality here

//routes
router.route("/create").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getAllAdminCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse);
router.route("/:courseId").get(isAuthenticated,getCourseById);
export default router;