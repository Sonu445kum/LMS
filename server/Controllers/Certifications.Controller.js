import Certification from "../Models/Certifications.Model.js";
import { uploadMedia, deleteMediaFromCloudinary } from "../Utils/Cloudinary.js";

// Upload a new certification
export const uploadCertification = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const {
      id,
      title,
      description,
      category,
      price,
      duration,
      tag,
      tagColor,
      introduction,
      key_1,
      key_2,
      key_3,
      Course_Benefits,
      Course_Benefits_2,
      Course_Benefits_3,
      Road_map,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const file = req.file.path;

    const uploadResponse = await uploadMedia(file);

    const certification = new Certification({
      id,
      title,
      description,
      category,
      price,
      duration,
      tag,
      tagColor,
      introduction,
      key_1,
      key_2,
      key_3,
      Course_Benefits,
      Course_Benefits_2,
      Course_Benefits_3,
      Road_map,
      image: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    });

    const savedCertification = await certification.save();
    res.status(201).json(savedCertification);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Update a certification
export const updateCertification = async (req, res) => {
  try {
    console.log("Request Params:", req.params); // Log the route parameters
    console.log("Request Body:", req.body); // Log the request body

    const { id } = req.params;
    const {
      title,
      description,
      category,
      price,
      duration,
      tag,
      tagColor,
      introduction,
      key_1,
      key_2,
      key_3,
      Course_Benefits,
      Course_Benefits_2,
      Course_Benefits_3,
      Road_map,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const certification = await Certification.findById(id);
    if (!certification) {
      return res.status(404).json({ message: "Certification not found" });
    }

    // Update fields
    certification.title = title || certification.title;
    certification.description = description || certification.description;
    certification.category = category || certification.category;
    certification.price = price || certification.price;
    certification.duration = duration || certification.duration;
    certification.tag = tag || certification.tag;
    certification.tagColor = tagColor || certification.tagColor;
    certification.introduction = introduction || certification.introduction;
    certification.key_1 = key_1 || certification.key_1;
    certification.key_2 = key_2 || certification.key_2;
    certification.key_3 = key_3 || certification.key_3;
    certification.Course_Benefits = Course_Benefits || certification.Course_Benefits;
    certification.Course_Benefits_2 = Course_Benefits_2 || certification.Course_Benefits_2;
    certification.Course_Benefits_3 = Course_Benefits_3 || certification.Course_Benefits_3;
    certification.Road_map = Road_map || certification.Road_map;

    const updatedCertification = await certification.save();
    res.status(200).json(updatedCertification);
  } catch (err) {
    console.error("Error updating certification:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Delete a certification


export const deleteCertification = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the certification by ID
    const certification = await Certification.findById(id);
    if (!certification) {
      return res.status(404).json({ message: "Certification not found" });
    }

    // If the certification has an associated image, delete it from Cloudinary
    if (certification.publicId) {
      await deleteMediaFromCloudinary(certification.publicId); // Use the utility function to delete the media
    }

    // Delete the certification from the database
    await Certification.findByIdAndDelete(id);

    res.status(200).json({ message: "Certification deleted successfully" });
  } catch (err) {
    console.error("Error deleting certification:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get all certifications
export const getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.status(200).json(certifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a certification by ID
export const getCertificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const certification = await Certification.findById(id);
    if (!certification) {
      return res.status(404).json({ message: "Certification not found" });
    }
    res.status(200).json(certification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};