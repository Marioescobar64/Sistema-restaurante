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
import { authenticate, authorize } from '../../middlewares/auth-middleware.js';

const router = Router();

// GET
router.get('/', authenticate, authorize(['reservations']), getReservas);

router.get(
  '/:id',
  authenticate,
  authorize(['reservations']),
  validateGetReservaById,
  getReservaById
);

// POST
router.post(
  '/',
  authenticate,
  authorize(['reservations']),
  validateCreateReserva,
  createReserva
);

// PUT
router.put(
  '/:id',
  authenticate,
  authorize(['reservations']),
  validateUpdateReservaRequest,
  updateReserva
);

router.put(
  '/:id/activate',
  authenticate,
  authorize(['reservations']),
  validateReservaStatusChange,
  changeReservaStatus
);

router.put(
  '/:id/deactivate',
  authenticate,
  authorize(['reservations']),
  validateReservaStatusChange,
  changeReservaStatus
);

export default router;