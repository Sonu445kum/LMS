import mongoose from "mongoose";
import dotenv from "dotenv";
import Certification from "../Models/Certifications.Model.js"; // Adjust the path to your model
import { certificates } from "../Data.js"; // Adjust the path to your data file
import connectDB from "../Database/db.js"; // Adjust the path to your database connection file

dotenv.config(); // Load environment variables

const sendDataToDB = async () => {
  try {
    // Connect to the database
    await connectDB();

    console.log("Database connected successfully!");

    // Optional: Clear existing data
    // await Certification.deleteMany();

    // Flatten the nested `certificates` object into an array
    const flattenedCertificates = Object.values(certificates).flat();

    // Insert the data
    const createdCertifications = await Certification.insertMany(flattenedCertificates);
    console.log("Data imported successfully:", createdCertifications);

    process.exit(); // Exit the process after completion
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1); // Exit with failure
  }
};

sendDataToDB();