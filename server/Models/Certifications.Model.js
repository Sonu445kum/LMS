import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema({

  title: { type: String, required: true },
  image: { type: String, required: true },
  publicId: { type: String, required: true }, // Ensure this field is defined and required
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  tag: { type: String },
  tagColor: { type: String },
  introduction: { type: String },
  key_1: { type: String },
  key_2: { type: String },
  key_3: { type: String },
  Course_Benefits: { type: String },
  Course_Benefits_2: { type: String },
  Course_Benefits_3: { type: String },
  Road_map: { type: [String] }, // Array of roadmap items
});

const Certification = mongoose.model("Certification", CertificationSchema);

export default Certification;