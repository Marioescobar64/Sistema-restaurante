import { Router } from 'express';
import {
  getEventos,
  getEventoById,
  createEvento,
  updateEvento,
  changeEventoStatus
} from './event-controller.js';

import {
  validateCreateEvento,
  validateUpdateEventoRequest,
  validateEventoStatusChange,
  validateGetEventoById
} from '../../middlewares/event-validation.js';
import { authenticate, authorize } from '../../middlewares/auth-middleware.js';

const router = Router();

// GET
router.get('/', authenticate, authorize(['events']), getEventos);

router.get(
  '/:id',
  authenticate,
  authorize(['events']),
  validateGetEventoById,
  getEventoById
);

// POST
router.post(
  '/',
  authenticate,
  authorize(['events']),
  validateCreateEvento,
  createEvento
);

// PUT
router.put(
  '/:id',
  authenticate,
  authorize(['events']),
  validateUpdateEventoRequest,
  updateEvento
);

router.put(
  '/:id/activate',
  authenticate,
  authorize(['events']),
  validateEventoStatusChange,
  changeEventoStatus
);

router.put(
  '/:id/deactivate',
  authenticate,
  authorize(['events']),
  validateEventoStatusChange,
  changeEventoStatus
);

export default router;