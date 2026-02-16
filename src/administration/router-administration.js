// importar las dependencias
import { Router } from "express";
import {
  getAdministrations,
  createAdministration,
  getAdministrationById,
  updateAdministration,
  changeAdministrationStatus,
} from "./controller-administration.js";

import {
  validateCreateAdministration,
  validateUpdateAdministrationRequest,
  validateAdministrationStatusChange,
  validateGetAdministrationById,
} from "../../middlewares/administration-validation.js";

import { uploadAdministrationImage } from "../../middlewares/file-update.js";

const router = Router();

// Rutas Get
router.get('/', getAdministrations);
router.get('/:id', validateGetAdministrationById, getAdministrationById);

// rutas Post
router.post(
  '/',
  uploadAdministrationImage.single('photo'),
  validateCreateAdministration,
  createAdministration
);

// Rutas Put
router.put(
  '/:id',
  uploadAdministrationImage.single('photo'),
  validateUpdateAdministrationRequest,
  updateAdministration
);

// Activar / desactivar sin borrar
router.patch(
  '/:id/activate',
  validateAdministrationStatusChange,
  changeAdministrationStatus
);

router.patch(
  '/:id/deactivate',
  validateAdministrationStatusChange,
  changeAdministrationStatus
);

export default router;
