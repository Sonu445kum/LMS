import { Course } from "../Models/Course.Model.js";

export const createCourse = async(req,res)=>{
    try {
        const {courseTitle,category} =req.body;
        if(!courseTitle || !category){
            return res.status(400).json({msg:"All fields are required"});
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator:req.id
        });

        return res.status(201).json({msg:"Course created successfully",course});
    } catch (error) {
       return res.status(500).json({msg:"Something went wrong"}); 
    }
}