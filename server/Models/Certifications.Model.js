// models/Certification.js
import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  issuedBy: String,
  duration: String, // e.g. "6 months", "1 year"
  validity: String, // e.g. "Lifetime", "1 year"
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Certification', certificationSchema);
