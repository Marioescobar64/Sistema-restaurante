// importar las dependencias
import { Router } from "express";
import {
  getMaintenances,
  createMaintenance,
  getMaintenanceById,
  updateMaintenance,
  changeMaintenanceStatus,
} from "./maintenance-controller.js";

import {
  validateCreateMaintenance,
  validateUpdateMaintenanceRequest,
  validateMaintenanceStatusChange,
  validateGetMaintenanceById,
} from "../../middlewares/validation-maintenance.js";

import { uploadMaintenanceImage } from "../../middlewares/file-update.js";

const router = Router();

// Rutas Get
router.get('/', getMaintenances);
router.get('/:id', validateGetMaintenanceById, getMaintenanceById);

// rutas Post
router.post(
  '/',
  uploadMaintenanceImage.single('photo'),
  validateCreateMaintenance,
  createMaintenance
);

// Rutas Put
router.put(
  '/:id',
  uploadMaintenanceImage.single('photo'),
  validateUpdateMaintenanceRequest,
  updateMaintenance
);

// Activar / desactivar sin borrar
router.patch(
  '/:id/activate',
  validateMaintenanceStatusChange,
  changeMaintenanceStatus
);

router.patch(
  '/:id/deactivate',
  validateMaintenanceStatusChange,
  changeMaintenanceStatus
);

export default router;
