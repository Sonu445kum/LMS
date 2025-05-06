// import express from "express";
// import isAuthenticated from "../Middlewares/isAuthenticated.js";
// import { createCourse, createLecture, editCourse, editLecture, getAllAdminCourses, getCourseById, getCourseLecture, getLectureById, getPublishedCourse, removeLecture, togglePublishCourse } from "../Controllers/Course.Controller.js";
// import upload from "../Utils/Multer.js";
// const router = express.Router();
// //import controller functionality here

// //routes
// router.route("/create").post(isAuthenticated,createCourse);
// router.route("/published-courses").get(isAuthenticated,getPublishedCourse);
// router.route("/").get(isAuthenticated,getAllAdminCourses);
// router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse);
// router.route("/:courseId").get(isAuthenticated,getCourseById);
// router.route("/:courseId/lecture").post(isAuthenticated,createLecture);
// router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture);
// router.route("/:courseId/lecture/:lectureId").post(isAuthenticated,editLecture);
// router.route("/lecture/:lectureId").delete(isAuthenticated,removeLecture);
// router.route("/lecture/:lectureId").get(isAuthenticated,getLectureById);
// router.route("/:courseId").patch(isAuthenticated,togglePublishCourse);



// export default router;

import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse,  removeLecture, searchCourse, togglePublishCourse } from "../Controllers/Course.Controller.js";
import upload from "../Utils/Multer.js";
const router = express.Router();



router.route("/").post(isAuthenticated,createCourse);
router.route("/search").get(isAuthenticated, searchCourse);
router.route("/published-courses").get(getPublishedCourse);
router.route("/").get(isAuthenticated,getCreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);


export default router;