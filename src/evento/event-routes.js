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

const router = Router();

// GET
router.get('/', getEventos);

router.get(
  '/:id',
  validateGetEventoById,
  getEventoById
);

// POST
router.post(
  '/',
  validateCreateEvento,
  createEvento
);

// PUT
router.put(
  '/:id',
  validateUpdateEventoRequest,
  updateEvento
);

router.put(
  '/:id/activate',
  validateEventoStatusChange,
  changeEventoStatus
);

router.put(
  '/:id/deactivate',
  validateEventoStatusChange,
  changeEventoStatus
);

export default router;