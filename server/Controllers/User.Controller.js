import { User } from "../Models/User.Model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/GenerateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../Utils/Cloudinary.js";

// 🛠 Register User
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 🔴 Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields",
            });
        }

        // 🔴 Check if email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already in use",
            });
        }

        // 🔒 Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Create New User
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create user",
        });
    }
};

// 🛠 Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔴 Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 🔴 Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        // 🔒 Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

        // ✅ Generate Token
        generateToken(res, user, `Welcome back ${user.name}`);

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user,
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to login",
        });
    }
};

// 🛠 Logout User
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout",
        });
    }
};

// 🛠 Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        // ✅ Get user ID from request
        const userId = req.id;

        // 🔴 Find user by ID
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // ✅ Return user profile
        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.error("Profile Fetch Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
        });
    }
};

// 🛠 Update User Profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file; // Uploaded file

        // 🔴 Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let photoUrl = user.photoUrl; // Default to existing photo

        // 🔄 If a new photo is uploaded
        if (profilePhoto) {
            try {
                // 🗑 Delete old photo from Cloudinary if it exists
                if (user.photoUrl) {
                    const publicId = user.photoUrl.split("/").pop().split(".")[0];
                    await deleteMediaFromCloudinary(publicId);
                }

                // ☁️ Upload new photo
                const cloudResponse = await uploadMedia(profilePhoto.path);
                photoUrl = cloudResponse.secure_url;
            } catch (cloudError) {
                console.error("Cloudinary Error:", cloudError);
                return res.status(500).json({
                    success: false,
                    message: "Failed to upload new profile picture",
                });
            }
        }

        // 🔄 Update user profile
        const updatedData = { name };
        if (photoUrl) updatedData.photoUrl = photoUrl;

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile Updated Successfully",
        });

    } catch (error) {
        console.error("Profile Update Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating profile",
        });
    }
};
