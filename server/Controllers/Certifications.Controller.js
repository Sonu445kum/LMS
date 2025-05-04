import Certification from "../Models/Certifications.Model.js";
import { uploadMedia, deleteMediaFromCloudinary } from "../Utils/Cloudinary.js";


//Download the certifications data from the frontend assets folder and save it to the database
import path from "path";
import fs from "fs";

// Download syllabus (PDF)
export const downloadSyllabus = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the certification by ID
    const certification = await Certification.findById(id);
    if (!certification || !certification.certificationPdf) {
      return res.status(404).json({ message: "Syllabus not found for this certification." });
    }

    // Check if the certificationPdf is a valid URL or a file path
    const pdfPath = certification.certificationPdf.startsWith("http")
      ? certification.certificationPdf
      : path.join(__dirname, "../uploads", certification.certificationPdf);

    // If it's a URL, redirect the user to the URL
    if (certification.certificationPdf.startsWith("http")) {
      return res.redirect(certification.certificationPdf);
    }

    // If it's a file path, check if the file exists
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ message: "Syllabus file not found on the server." });
    }

    // Send the file for download
    res.download(pdfPath, `${certification.title.replace(/\s+/g, "_")}_Syllabus.pdf`, (err) => {
      if (err) {
        console.error("Error downloading file:", err.message);
        res.status(500).json({ error: "Failed to download the syllabus." });
      }
    });
  } catch (err) {
    console.error("Error in downloadSyllabus:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
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
      certificationPdf,
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
      certificationPdf: req.body.certificationPdf || null, // Add certificationPdf field
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
      certificationPdf,
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
    certification.certificationPdf = certificationPdf || certification.certificationPdf; // Update certificationPdf

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
    res.status(200).json(certifications); // Return array directly
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch certifications" });
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

//
export const getCertificationAssets = async (req, res) => {
  const { certificationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(certificationId)) {
    return res.status(400).json({ error: "Invalid certification ID" });
  }

  try {
    const cert = await Certification.findById(certificationId);
    if (!cert) {
      return res.status(404).json({ error: "Certification not found" });
    }

    // Return certification assets
    const assets = {
      imageUrl: cert.imageUrl,
      title: cert.title,
      description: cert.description,
      issuedBy: cert.issuedBy,
      duration: cert.duration,
      validity: cert.validity
    };

    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
