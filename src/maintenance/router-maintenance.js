import { Router } from 'express';
import {
  getMaintenances,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  changeMaintenanceStatus,
} from './controller-maintenance.js';

import {
  validateCreateMaintenance,
  validateUpdateMaintenance,
  validateMaintenanceStatusChange,
  validateGetMaintenanceById,
} from '../../middlewares/validation-maintenace.js';

import { uploadFieldImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

// ====================
// RUTAS GET
// ====================

// Obtener todas las mesas (paginación + filtros)
router.get('/', getMaintenances);

// Obtener mesa por ID
router.get(
  '/:id',
  validateGetMaintenanceById,
  getMaintenanceById
);

// ====================
// RUTAS POST
// ====================

// Crear mesa
router.post(
  '/',
  uploadFieldImage.single('photo'), // campo del form-data: photo
  cleanupUploadedFileOnFinish,
  validateCreateMaintenance,
  createMaintenance
);

// ====================
// RUTAS PUT
// ====================

// Actualizar mesa
router.put(
  '/:id',
  uploadFieldImage.single('photo'),
  validateUpdateMaintenance,
  updateMaintenance
);

// Activar mesa
router.put(
  '/:id/activate',
  validateMaintenanceStatusChange,
  changeMaintenanceStatus
);

// Desactivar mesa
router.put(
  '/:id/deactivate',
  validateMaintenanceStatusChange,
  changeMaintenanceStatus
);

export default router;