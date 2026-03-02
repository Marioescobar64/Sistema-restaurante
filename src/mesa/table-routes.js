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

const router = Router();

// GET
router.get('/', getMesas);

router.get(
  '/:id',
  validateGetMesaById,
  getMesaById
);

// POST
router.post(
  '/',
  validateCreateMesa,
  createMesa
);

// PUT
router.put(
  '/:id',
  validateUpdateMesaRequest,
  updateMesa
);

router.put(
  '/:id/activate',
  validateMesaStatusChange,
  changeMesaStatus
);

router.put(
  '/:id/deactivate',
  validateMesaStatusChange,
  changeMesaStatus
);

export default router;