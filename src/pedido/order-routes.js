import { Router } from 'express';
import {
  getPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  changePedidoStatus
} from './order-controller.js';

import {
  validateCreatePedido,
  validateUpdatePedidoRequest,
  validatePedidoStatusChange,
  validateGetPedidoById
} from '../../middlewares/order-validation.js';

const router = Router();

// GET
router.get('/', getPedidos);

router.get(
  '/:id',
  validateGetPedidoById,
  getPedidoById
);

// POST
router.post(
  '/',
  validateCreatePedido,
  createPedido
);

// PUT
router.put(
  '/:id',
  validateUpdatePedidoRequest,
  updatePedido
);

router.put(
  '/:id/activate',
  validatePedidoStatusChange,
  changePedidoStatus
);

router.put(
  '/:id/deactivate',
  validatePedidoStatusChange,
  changePedidoStatus
);

export default router;