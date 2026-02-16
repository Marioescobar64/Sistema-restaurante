import { Router } from 'express';
import {
  getAdministrations,
  getAdministrationById,
  createAdministration,
  updateAdministration,
  changeAdministrationStatus,
} from './controller-administration.js';

import {
  validateCreateAdministration,
  validateUpdateAdministration,
  validateAdministrationStatusChange,
  validateGetAdministrationById,
} from '../../middlewares/validation-administration.js';

import { uploadFieldImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

// ====================
// RUTAS GET
// ====================

// Obtener todos los restaurantes
router.get('/', getAdministrations);

// Obtener restaurante por ID
router.get(
  '/:id',
  validateGetAdministrationById,
  getAdministrationById
);

// ====================
// RUTAS POST
// ====================

// Crear restaurante
router.post(
  '/',
  uploadFieldImage.single('photo'), // campo del form-data: photo
  cleanupUploadedFileOnFinish,
  validateCreateAdministration,
  createAdministration
);

// ====================
// RUTAS PUT
// ====================

// Actualizar restaurante
router.put(
  '/:id',
  uploadFieldImage.single('photo'),
  validateUpdateAdministration,
  updateAdministration
);

// Activar restaurante
router.put(
  '/:id/activate',
  validateAdministrationStatusChange,
  changeAdministrationStatus
);

// Desactivar restaurante
router.put(
  '/:id/deactivate',
  validateAdministrationStatusChange,
  changeAdministrationStatus
);

export default router;