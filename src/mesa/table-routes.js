import { Router } from 'express';
import {
  getMesas,
  getMesaById,
  createMesa,
  updateMesa,
  changeMesaStatus
} from './table-controller.js';

import {
  validateCreateMesa,
  validateUpdateMesaRequest,
  validateMesaStatusChange,
  validateGetMesaById
} from '../../middlewares/table-validation.js';
import { authenticate, authorize } from '../../middlewares/auth-middleware.js';

const router = Router();

// GET
router.get('/', authenticate, authorize(['tables']), getMesas);

router.get(
  '/:id',
  authenticate,
  authorize(['tables']),
  validateGetMesaById,
  getMesaById
);

// POST
router.post(
  '/',
  authenticate,
  authorize(['tables']),
  validateCreateMesa,
  createMesa
);

// PUT
router.put(
  '/:id',
  authenticate,
  authorize(['tables']),
  validateUpdateMesaRequest,
  updateMesa
);

router.put(
  '/:id/activate',
  authenticate,
  authorize(['tables']),
  validateMesaStatusChange,
  changeMesaStatus
);

router.put(
  '/:id/deactivate',
  authenticate,
  authorize(['tables']),
  validateMesaStatusChange,
  changeMesaStatus
);

export default router;