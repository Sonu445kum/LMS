import {v2 as cloudinary} from "cloudinary";
import upload from "./Multer.js";
import dotenv  from 'dotenv';
dotenv.config({});

cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_NAME
});

export const uploadMedia = async (file) => {
    try {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });
      return uploadResponse;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to upload file to Cloudinary");
    }
  };
//delete photo
export const deleteMediaFromCloudinary = async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to delete media from Cloudinary",
            error:error.message
        })
    }
}

export const deleteVideoFromCloudinary = async(publicId)=>{
    try {
       await cloudinary.uploader.destroy(publicId,{
        resource_type:"video"
       }) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to delete video from Cloudinary",
            error:error.message
        })
    }
}

