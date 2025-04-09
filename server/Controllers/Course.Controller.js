// import { Course } from "../Models/Course.Model.js";
// import {deleteMediaFromCloudinary,uploadMedia} from "../Utils/Cloudinary.js";
// export const createCourse = async(req,res)=>{
//     try {
//         const {courseTitle,category} =req.body;
//         if(!courseTitle || !category){
//             return res.status(400).json({msg:"All fields are required"});
//         }
//         const course = await Course.create({
//             courseTitle,
//             category,
//             creator:req.id
//         });

//         return res.status(201).json({msg:"Course created successfully",course});
//     } catch (error) {
//        return res.status(500).json({msg:"Something went wrong"});
//     }
// };

// //get all courses
// export const getAllAdminCourses = async(req,res)=>{
//     try {
//         const userId = req.id;
//         const courses = await Course.find({creator:userId});
//         if(!courses){
//             return res.status(404).json({
//                 success:false,
//                 courses:[],
//                 msg:"No courses found"
//             });
//         }
//         return res.status(200).json({msg:"Courses fetched successfully",courses});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({msg:"Something went wrong"});
//     }
// }
// //edit course
// export const editCourse = async(req,res)=>{
//     try {
//         //extract courseId from req.params.courseId
//         const courseId = req.params.courseId;
//         const {courseTitle,subTitle,description,category,courseLevel,coursePrice} = req.body;
//         // extract thumbnail from file
//         const thumbnail = req.file;

//         let course = await Course.findById(courseId);
//         if(!course){
//             return res.status(404).json({msg:"Course not found"});
//         }
//         //delete the previous courseThumbnail
//         let courseThumbnail;
//         if(thumbnail){
//             if(course.courseThumbnail){
//                 const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
//                 await deleteMediaFromCloudinary(publicId);
//             }
//             // upload a thumbnail on Cloudinary
//             courseThumbnail = await uploadMedia(thumbnail.path);
//         }
//         //upload new thumbnail
//         const updateData = {courseTitle,subTitle,description,category,courseLevel,coursePrice,courseThumbnail:courseThumbnail?.secure_url};
//         //update the course
//         course = await Course.findByIdAndUpdate(courseId,updateData,{new:true});
//         return res.status(200).json({msg:"Course updated successfully",course});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({msg:"Something went wrong in the Updated Course"});
//     }
// }

// new code
// import { Course } from "../Models/Course.Model.js";
// import { Lecture } from "../Models/Lecture.Model.js";
// import {
//   deleteMediaFromCloudinary,
//   deleteVideoFromCloudinary,
//   uploadMedia,
// } from "../Utils/Cloudinary.js";

// // Create a new course
// export const createCourse = async (req, res) => {
//   try {
//     const { courseTitle, category } = req.body;

//     if (!courseTitle || !category) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     const course = await Course.create({
//       courseTitle,
//       category,
//       creator: req.id,
//     });

//     return res.status(201).json({ msg: "Course created successfully", course });
//   } catch (error) {
//     console.error("Error creating course:", error);
//     return res.status(500).json({ msg: "Something went wrong" });
//   }
// };

// // Get all courses for an admin (creator)
// export const getAllAdminCourses = async (req, res) => {
//   try {
//     const userId = req.id;

//     const courses = await Course.find({ creator: userId });

//     if (!courses || courses.length === 0) {
//       return res.status(404).json({
//         success: false,
//         courses: [],
//         msg: "No courses found",
//       });
//     }

//     return res
//       .status(200)
//       .json({ msg: "Courses fetched successfully", courses });
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     return res.status(500).json({ msg: "Something went wrong" });
//   }
// };

// // Edit course
// export const editCourse = async (req, res) => {
//   try {
//     const courseId = req.params.courseId;
//     const {
//       courseTitle,
//       subTitle,
//       description,
//       category,
//       courseLevel,
//       coursePrice,
//     } = req.body;

//     const thumbnail = req.file;

//     let course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ msg: "Course not found" });
//     }

//     let courseThumbnail = course.courseThumbnail;

//     if (thumbnail) {
//       // Delete previous thumbnail from Cloudinary
//       if (courseThumbnail) {
//         const publicId = courseThumbnail.split("/").pop().split(".")[0];
//         await deleteMediaFromCloudinary(publicId);
//       }

//       // Upload new thumbnail to Cloudinary
//       const uploaded = await uploadMedia(thumbnail.path);
//       courseThumbnail = uploaded?.secure_url;
//     }

//     const updateData = {
//       courseTitle,
//       subTitle,
//       description,
//       category,
//       courseLevel,
//       coursePrice,
//       courseThumbnail,
//     };

//     // Remove undefined or null fields from updateData
//     Object.keys(updateData).forEach(
//       (key) => updateData[key] === undefined && delete updateData[key]
//     );

//     course = await Course.findByIdAndUpdate(courseId, updateData, {
//       new: true,
//     });

//     return res.status(200).json({ msg: "Course updated successfully", course });
//   } catch (error) {
//     console.error("Error updating course:", error);
//     return res
//       .status(500)
//       .json({ msg: "Something went wrong in the Updated Course" });
//   }
// };
// // getCourseById
// export const getCourseById = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ msg: "Course not found" });
//     }
//     return res.status(200).json({ course });
//   } catch (error) {
//     console.error("Error getting course by ID:", error);
//     return res
//       .status(500)
//       .json({ msg: "Something went wrong in the Get Course by Id" });
//   }
// };

// //create Lecture
// export const createLecture = async (req, res) => {
//   try {
//     const { lectureTitle } = req.body;
//     const { courseId } = req.params;

//     if (!lectureTitle || !courseId) {
//       return res
//         .status(400)
//         .json({ message: "Please provide lecture title and course id" });
//     }
//     //create lecture
//     const newLecture = await Lecture.create({ lectureTitle });
//     const course = await Course.findById(courseId);
//     if (course) {
//       course.lectures.push(newLecture._id);
//       await course.save();
//     }
//     return res.status(201).json({
//       newLecture,
//       message: "Lecture created successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Error creating lecture" });
//   }
// };

// // getCourseLecture
// export const getCourseLecture = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const course = await Course.findById(courseId).populate("lectures");
//     if (!course) {
//       return res.status(404).json({ msg: "Course not found" });
//     }
//     return res.status(200).json({ lectures: course.lectures });
//   } catch (error) {
//     console.error("Error getting course lectures:", error);
//     return res.status(500).json({
//       msg: "Something went wrong in the Get Course Lecture",
//     });
//   }
// };

// // editVideoLecture
// export const editLecture = async (req, res) => {
//   try {
//     const { lectureTitle, videoInfo, isPreviewFree } = req.body;
//     const { courseId, lectureId } = req.params;
//     const lecture = await Lecture.findById(lectureId);
//     if (!lecture) {
//       return res.status(404).json({ msg: "Lecture not found" });
//     }
//     //update lecture
//     if (lectureTitle) {
//       lecture.lectureTitle = lectureTitle;
//     }
//     if (videoInfo) {
//       lecture.videoUrl = videoInfo.videoUrl;
//     }
//     if (videoInfo) {
//       lecture.publicId = videoInfo.publicId;
//     }
//     lecture.isPreviewFree = isPreviewFree;

//     //save lecture
//     await lecture.save();

//     //Ensure the course still has the lecture id if it was not already added
//     const course = await Course.findById(courseId);
//     if (course && !course.lectures.includes(lecture._id)) {
//       course.lectures.push(lecture._id);
//       await course.save();
//     }
//     return res.status(200).json({
//       msg: "Lecture updated successfully",
//       lecture,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       msg: "Something went wrong in the Edit Lecture",
//     });
//   }
// };

// //removeLecture
// export const removeLecture = async (req, res) => {
//   try {
//     const { lectureId } = req.params;
//     const lecture = await Lecture.findByIdAndDelete(lectureId);
//     if (!lecture) {
//       return res.status(404).json({ msg: "Lecture not found" });
//     }
//     // Delete the Lecture from Couldinary as Well
//     if (lecture.publicId) {
//       await deleteVideoFromCloudinary(lecture.publicId);
//     }
//     //remove the lecture from the course
//     await Course.updateOne(
//       { lectures: lectureId }, // find the course that contains the lecture
//       { $pull: { lectures: lectureId } } // Remove the Lecture id from lecture array
//     );
//     return res.status(200).json({ msg: "Lecture removed successfully" });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ msg: "Something went wrong in the Remove Lecture" });
//   }
// };

// //getLectureById
// export const getLectureById = async (req, res) => {
//   try {
//     const { lectureId } = req.params;
//     const lecture = await Lecture.findById(lectureId);
//     if (!lecture) {
//       return res.status(404).json({ msg: "Lecture not found" });
//     }
//     return res.status(200).json({ lecture });
//   } catch (error) {
//     console.error("Error getting lecture by ID:", error);
//     return res
//       .status(500)
//       .json({ msg: "Something went wrong in the Get Lecture by Id" });
//   }
// };

// //Publish or UnPublish a Course Logic
// export const togglePublishCourse = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const { publish } = req.query;
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ msg: "Course not found" });
//     }
//     // Toggle the publish status of the course
//     course.isPublished = publish === "true";
//     await course.save();
//     const statusMessage = course.isPublished ? "published" : "unpublished";
//     return res
//       .status(200)
//       .json({ msg: `Course ${statusMessage} successfully` });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ msg: "Something went wrong in the Toggle Publish Course" });
//   }
// };

// // getPublishedCourse
// export const getPublishedCourse = async (req, res) => {
//   try {
//     const courses = await Course.find({ isPublished: true }).populate({path:"creator",select:"name photoUrl"});
//     if(!courses){
//       return res.status(404).json({ msg: "No courses found" });
//     }
//     return res.status(200).json({ courses });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "Something went wrong in the Get Published Course" });
//   }
// }


// again new code 
import mongoose from "mongoose";
import { Course } from "../Models/Course.Model.js";
import { Lecture } from "../Models/Lecture.Model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../Utils/Cloudinary.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;

    if (!courseTitle || !category) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({ msg: "Course created successfully", course });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
export const getAllCourses = async (req, res) => {
  try {
    let query = {};
    let sortQuery = {};

    // Get categories from query as an array
    if (req.query.categories) {
      const categoriesArray = req.query.categories.split(",");
      query.category = { $in: categoriesArray };
    }

    // Handle sorting
    if (req.query.sort === "low") {
      sortQuery.price = 1; // Ascending
    } else if (req.query.sort === "high") {
      sortQuery.price = -1; // Descending
    }

    const courses = await Course.find(query).sort(sortQuery);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

// Get all courses for a specific creator
export const getAllAdminCourses = async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.id });

    if (!courses.length) {
      return res.status(404).json({ success: false, courses: [], msg: "No courses found" });
    }

    return res.status(200).json({ msg: "Courses fetched successfully", courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

// Edit a course
export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;

    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    let courseThumbnail = course.courseThumbnail;

    if (thumbnail) {
      if (courseThumbnail) {
        const publicId = courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      const uploaded = await uploadMedia(thumbnail.path);
      courseThumbnail = uploaded?.secure_url;
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

    return res.status(200).json({ msg: "Course updated successfully", course });
  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ msg: "Something went wrong while updating course" });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid course ID" });
    }

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    return res.status(200).json(course);
  } catch (error) {
    console.error("Error getting course by ID:", error);
    return res.status(500).json({ msg: "Something went wrong while fetching course" });
  }
};

// Create a lecture
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({ msg: "Lecture title and course ID are required" });
    }

    const newLecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(newLecture._id);
      await course.save();
    }

    return res.status(201).json({ newLecture, msg: "Lecture created successfully" });
  } catch (error) {
    console.error("Error creating lecture:", error);
    return res.status(500).json({ msg: "Something went wrong while creating lecture" });
  }
};

// Get all lectures of a course
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) return res.status(404).json({ msg: "Course not found" });

    return res.status(200).json({ lectures: course.lectures });
  } catch (error) {
    console.error("Error getting lectures:", error);
    return res.status(500).json({ msg: "Something went wrong while fetching lectures" });
  }
};

// Edit a lecture
export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) return res.status(404).json({ msg: "Lecture not found" });

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo) {
      lecture.videoUrl = videoInfo.videoUrl;
      lecture.publicId = videoInfo.publicId;
    }
    if (typeof isPreviewFree !== "undefined") {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({ msg: "Lecture updated successfully", lecture });
  } catch (error) {
    console.error("Error editing lecture:", error);
    return res.status(500).json({ msg: "Something went wrong while editing lecture" });
  }
};

// Remove a lecture
export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) return res.status(404).json({ msg: "Lecture not found" });

    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    await Course.updateOne({ lectures: lectureId }, { $pull: { lectures: lectureId } });

    return res.status(200).json({ msg: "Lecture removed successfully" });
  } catch (error) {
    console.error("Error removing lecture:", error);
    return res.status(500).json({ msg: "Something went wrong while removing lecture" });
  }
};

// Get lecture by ID
export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) return res.status(404).json({ msg: "Lecture not found" });

    return res.status(200).json({ lecture });
  } catch (error) {
    console.error("Error getting lecture by ID:", error);
    return res.status(500).json({ msg: "Something went wrong while fetching lecture" });
  }
};

// Toggle publish/unpublish course
export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    course.isPublished = publish === "true";
    await course.save();

    return res.status(200).json({
      msg: `Course ${course.isPublished ? "published" : "unpublished"} successfully`,
    });
  } catch (error) {
    console.error("Error toggling publish:", error);
    return res.status(500).json({ msg: "Something went wrong while updating publish status" });
  }
};

// Get all published courses
export const getPublishedCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });

    if (!courses.length) {
      return res.status(404).json({ msg: "No courses found" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching published courses:", error);
    return res.status(500).json({ msg: "Something went wrong while fetching published courses" });
  }
};


// Search Courses
export const searchCourses = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    if (!searchQuery || searchQuery.trim() === "") {
      return res.status(400).json({ msg: "Search query is required" });
    }

    // Using a regex search (case-insensitive)
    const courses = await Course.find({
      courseTitle: { $regex: searchQuery, $options: "i" },
    });

    if (!courses.length) {
      return res.status(404).json({ msg: "No courses matched your search" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error searching courses:", error);
    return res.status(500).json({ msg: "Something went wrong while searching courses" });
  }
};
