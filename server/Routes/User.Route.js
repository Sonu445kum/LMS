import express from "express";
import { getUserProfile, login, logout, register } from "../Controllers/User.Controller.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route('/profile').get(isAuthenticated,getUserProfile);
export default router;