import { Router } from 'express';
import {
  getMenu,
  getMenuById,
  createMenu,
  updateMenu,
  changeMenuStatus,
} from './controller-menu.js';

import {
  validateCreateMenu,
  validateUpdateMenu,
  validateMenuStatusChange,
  validateGetMenuById,
} from '../../middlewares/validation-maintenace.js';

import { uploadFieldImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

// ====================
// RUTAS GET
// ====================

// Obtener todas las mesas (paginación + filtros)
router.get('/', getMenu);

// Obtener mesa por ID
router.get(
  '/:id',
  validateGetMenuById,
  getMenuById
);

// ====================
// RUTAS POST
// ====================

// Crear mesa
router.post(
  '/',
  uploadFieldImage.single('photo'), // campo del form-data: photo
  cleanupUploadedFileOnFinish,
  validateCreateMenu,
  createMenu
);

// ====================
// RUTAS PUT
// ====================

// Actualizar mesa
router.put(
  '/:id',
  uploadFieldImage.single('photo'),
  validateUpdateMenu,
  updateMenu
);

// Activar mesa
router.put(
  '/:id/activate',
  validateMenuStatusChange,
  changeMaintenanceStatus
);

// Desactivar mesa
router.put(
  '/:id/deactivate',
  validateMenuStatusChange,
  changeMenuStatus
);

export default router;