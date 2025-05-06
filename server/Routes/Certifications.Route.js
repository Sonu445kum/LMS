import express from "express";
import upload from "../Utils/Multer.js";
import {
  uploadCertification,
  updateCertification,
  deleteCertification,
  getAllCertifications,
  getCertificationById,
 
} from "../Controllers/Certifications.Controller.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const router = express.Router();


// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Map of IDs to file names
const fileMappings = {
  "6815f299180931855d05eea5": "food_Safety.pdf",
  "6815f299180931855d05eea3":"caliboration.pdf",
  "6815f299180931855d05ee34":"Microsoft_Azure.pdf",
  "another_id": "Microsoft_Azure.pdf",
  "calibration_id": "caliboration.pdf",
};
// Download Certifications (PDF)
// Map of IDs to file names
router.get("/download-syllabus/:id", (req, res) => {
  const { id } = req.params;
  // console.log("Received ID:", id);

  const fileName = fileMappings[id];
  if (!fileName) {
    // console.error("Invalid ID:", id);
    return res.status(404).send("Syllabus file not found.");
  }

  const filePath = path.join(__dirname, "../backendassets/frontend_assets/pdfs", fileName);
  // console.log("Resolved file path:", filePath);

  if (!fs.existsSync(filePath)) {
    
    return res.status(404).send("Syllabus file not found.");
  }

  res.download(filePath, (err) => {
    if (err) {
      // console.error("Error in downloadSyllabus:", err.message);
      res.status(500).send("Error downloading the syllabus.");
    }
  });
});
// Upload a new certification (requires authentication)
router.post("/create", isAuthenticated, upload.single("file"), uploadCertification);

// Update a certification (requires authentication)
router.put("/update/:id", isAuthenticated, upload.single("file"), updateCertification);

// Delete a certification (requires authentication)
router.delete("/delete/:id", isAuthenticated, deleteCertification);

// Get all certifications (public route)
router.get("/all", getAllCertifications);

// Get a certification by ID (public route)
router.get("/:id", getCertificationById);

export default router;