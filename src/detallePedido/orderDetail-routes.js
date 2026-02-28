import { Router } from 'express';
import {
  getDetalles,
  getDetalleById,
  createDetalle,
  updateDetalle,
  changeDetalleStatus
} from './orderDetail-controller.js';

import {
  validateCreateDetalle,
  validateUpdateDetalleRequest,
  validateDetalleStatusChange,
  validateGetDetalleById
} from '../../middlewares/orderDetail-validation.js';

const router = Router();

// GET
router.get('/', getDetalles);

router.get(
  '/:id',
  validateGetDetalleById,
  getDetalleById
);

// POST
router.post(
  '/',
  validateCreateDetalle,
  createDetalle
);

// PUT
router.put(
  '/:id',
  validateUpdateDetalleRequest,
  updateDetalle
);

router.put(
  '/:id/activate',
  validateDetalleStatusChange,
  changeDetalleStatus
);

router.put(
  '/:id/deactivate',
  validateDetalleStatusChange,
  changeDetalleStatus
);

export default router;