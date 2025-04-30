import mongoose from "mongoose";
import dotenv from "dotenv";
import Certification from "../Models/Certifications.Model.js";
import connectDB from "./db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Load environment variables

// Function to parse the assets.js file to extract image mappings
const parseAssetsFile = () => {
  const assetsFilePath = path.join(__dirname, "../backendassets/frontend_assets/assets.js"); // Correct file path
  if (!fs.existsSync(assetsFilePath)) {
    throw new Error(`Assets file not found at path: ${assetsFilePath}`);
  }

  const assetsContent = fs.readFileSync(assetsFilePath, "utf8");

  // Extract import statements using regex
  const importRegex = /import\s+(\w+)\s+from\s+["']\.\/([^"']+)["']/g;
  const matches = [...assetsContent.matchAll(importRegex)];

  // Create a mapping of variable names to file paths
  const imageMappings = {};
  matches.forEach((match) => {
    const variableName = match[1];
    const filePath = match[2];
    imageMappings[variableName] = filePath;
  });

  return imageMappings;
};

// Function to get all image files from the backend assets directory
const getImageFiles = () => {
  const assetsDir = path.join(__dirname, "../backendassets/frontend_assets"); // Correct path
  const files = fs.readdirSync(assetsDir);

  // Filter for image files
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(ext);
  });
};

// Function to create certification records from image files and assets mappings
const createCertificationRecords = (imageFiles, imageMappings) => {
  return imageFiles.map((file) => {
    const fileName = path.basename(file, path.extname(file));
    const title = fileName.replace(/_/g, " ");
    const category = ""; // Default category

    return {
      title: title,
      description: `Description for ${title}`,
      price: 499,
      image: `/frontend_assets/${file}`, // Correct path for serving images
      publicId: fileName,
      category: category,
      duration: "6 months",
    };
  });
};

const sendDataToDB = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("Database connected successfully!");

    // Optional: Clear existing data
    await Certification.deleteMany();
    console.log("Existing certifications cleared");

    // Parse the assets.js file
    const imageMappings = parseAssetsFile();
    console.log(`Parsed ${Object.keys(imageMappings).length} image mappings from assets.js`);

    // Get image files and create certification records
    const imageFiles = getImageFiles();
    console.log(`Found ${imageFiles.length} image files`);

    const certificationRecords = createCertificationRecords(imageFiles, imageMappings);

    // Insert the data
    const createdCertifications = await Certification.insertMany(certificationRecords);
    console.log(`Data imported successfully: ${createdCertifications.length} certifications created`);

    process.exit(); // Exit the process after completion
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1); // Exit with failure
  }
};

sendDataToDB();