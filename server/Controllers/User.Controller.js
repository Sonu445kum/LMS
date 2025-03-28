import { User } from "../Models/User.Model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/GenerateToken.js";
export const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        //check for filed
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill in all fields"})
        }
        //check if email is valid
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"Email already in use"})
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
         const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        });
        res.status(201).json({
            newUser,
            success:true,
            message:"User created successfully"
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create user"
        })
    }
};

//login
export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        //check fields
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email"
            })
        }
        //compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
                })
        }
        //generate token
        generateToken(res,user,`Welcome back ${user.name}`);
        res.status(200).json({
            user,
            success:true,
            message:"Logged in successfully",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
};

//logout
export const logout = async (__dirname,res)=>{
    try {
        return res.status(200).cookie('token',"",{maxAge:0}).json({
            success:true,
            message:"Logged out successfully"
        })
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Failed to logout"
       }) 
    }
};

//getUserProfile;
export const getUserProfile = async (req,res)=>{
    try {
       //get userId from the body
       const userId = req.id;
       //find user by userId
       const user = await User.findById(userId).select("-password");
       if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
            })
        }
        //return user
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
    }
}