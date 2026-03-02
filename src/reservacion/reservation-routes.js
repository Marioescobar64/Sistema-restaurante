import { Router } from 'express';
import {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  changeReservaStatus
} from './reservation-controller.js';

import {
  validateCreateReserva,
  validateUpdateReservaRequest,
  validateReservaStatusChange,
  validateGetReservaById
} from '../../middlewares/reservation-validation.js';

const router = Router();

// GET
router.get('/', getReservas);

router.get(
  '/:id',
  validateGetReservaById,
  getReservaById
);

// POST
router.post(
  '/',
  validateCreateReserva,
  createReserva
);

// PUT
router.put(
  '/:id',
  validateUpdateReservaRequest,
  updateReserva
);

router.put(
  '/:id/activate',
  validateReservaStatusChange,
  changeReservaStatus
);

router.put(
  '/:id/deactivate',
  validateReservaStatusChange,
  changeReservaStatus
);

export default router;