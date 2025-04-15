import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  description: String,
  issuer: String,
  issuedDate: Date,
  category: String,
  fileUrl: String,
  publicId: String,  // Required to delete from Cloudinary
  fileType: String,
}, { timestamps: true });

export default mongoose.model('Certification', certificationSchema);
