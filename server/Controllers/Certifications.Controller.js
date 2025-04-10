// controllers/certificationController.js
import Certification from '../Models/Certifications.Model.js';

export const getAllCertifications = async (req, res) => {
  const certifications = await Certification.find();
  res.json({ certifications });
};

export const createCertification = async (req, res) => {
  const cert = new Certification(req.body);
  await cert.save();
  res.status(201).json(cert);
};

export const getCertificationById = async (req, res) => {
  const cert = await Certification.findById(req.params.id);
  if (!cert) return res.status(404).json({ message: "Not found" });
  res.json(cert);
};
