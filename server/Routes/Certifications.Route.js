// routes/certificationRoutes.js
import express from 'express';
import {
  getAllCertifications,
  createCertification,
  getCertificationById,
} from '../Controllers/Certifications.Controller.js';
import isAuthenticated from '../Middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/', getAllCertifications);
router.post('/',isAuthenticated, createCertification); // only for admin
router.get('/:id', getCertificationById);

export default router;
