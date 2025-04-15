import Certification from "../Models/Certifications.Model.js";
import fs from "fs";
import { uploadMedia, deleteMediaFromCloudinary, deleteVideoFromCloudinary } from "../Utils/Cloudinary.js";
// getAllCertifications
export const getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch certifications", error });
  }
};
// Create Certification
 export const createCertification = async (req, res) => {
  try {
    const { name, description, issuer, issuedDate, category } = req.body;
    const userId = req.user.id;  // Access userId from req.user

    let fileUrl = null;
    let publicId = null;
    let fileType = null;

    if (req.file) {
      const result = await uploadMedia(req.file.path);
      fileUrl = result.secure_url;
      publicId = result.public_id;
      fileType = result.resource_type;

      fs.unlinkSync(req.file.path); // remove local file
    }

    const certification = new Certification({
      userId,
      name,
      description,
      issuer,
      issuedDate,
      category,
      fileUrl,
      fileType,
      publicId
    });

    await certification.save();
    res.status(201).json({ message: "Certification created successfully", certification });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create certification", error });
  }
};

// Get Certification by ID
// export const getCertificationById = async (req, res) => {
//   try {
//     const cert = await Certification.findById(req.params.id);
//     if (!cert) return res.status(404).json({ message: "Certification not found" });
//     res.status(200).json(cert);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch certification", error });
//   }
// };

import mongoose from "mongoose";

export const getCertificationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid certification ID" });
    }

    // Fetch the certification from the database
    const certification = await Certification.findById(id);

    if (!certification) {
      return res.status(404).json({ message: "Certification not found" });
    }

    res.status(200).json(certification);
  } catch (error) {
    console.error("Error fetching certification by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Certifications by Category
export const getCertificationsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const certs = await Certification.find({ category });
    res.status(200).json(certs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch certifications", error });
  }
};

// Update Certification
export const updateCertification = async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: "Certification not found" });

    const { name, description, issuer, issuedDate, category } = req.body;

    if (req.file) {
      // Delete old file from Cloudinary
      if (cert.fileType === "video") {
        await deleteVideoFromCloudinary(cert.publicId);
      } else {
        await deleteMediaFromCloudinary(cert.publicId);
      }

      // Upload new file
      const result = await uploadMedia(req.file.path);
      cert.fileUrl = result.secure_url;
      cert.publicId = result.public_id;
      cert.fileType = result.resource_type;

      fs.unlinkSync(req.file.path); // remove local
    }

    cert.name = name || cert.name;
    cert.description = description || cert.description;
    cert.issuer = issuer || cert.issuer;
    cert.issuedDate = issuedDate || cert.issuedDate;
    cert.category = category || cert.category;

    await cert.save();
    res.status(200).json({ message: "Certification updated", certification: cert });

  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

// Delete Certification
export const deleteCertification = async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: "Certification not found" });

    // Delete file from Cloudinary
    if (cert.fileType === "video") {
      await deleteVideoFromCloudinary(cert.publicId);
    } else {
      await deleteMediaFromCloudinary(cert.publicId);
    }

    await cert.deleteOne();
    res.status(200).json({ message: "Certification deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error });
  }
};
//export default

