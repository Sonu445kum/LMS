import express from 'express';
import upload from '../Utils/Multer.js';
import {
  createCertification,
  getCertificationById,
  getCertificationsByCategory,
  deleteCertification,
  updateCertification,
  getAllCertifications
} from '../Controllers/Certifications.Controller.js';
import isAuthenticated from '../Middlewares/isAuthenticated.js';


const router = express.Router();
router.get('/all',  getAllCertifications); // Get all certifications
router.post('/add', isAuthenticated, upload.single('file'), createCertification);
router.get('/:id', getCertificationById);
router.get('/category/:category', getCertificationsByCategory);
router.put('/:id', isAuthenticated, upload.single('file'), updateCertification);
router.delete('/:id', isAuthenticated, deleteCertification);

export default router;
