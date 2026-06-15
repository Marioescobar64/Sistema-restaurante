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
import { authenticate, authorize } from '../../middlewares/auth-middleware.js';

const router = Router();

// GET
router.get('/', authenticate, authorize(['orders']), getPedidos);

router.get(
  '/:id',
  authenticate,
  authorize(['orders']),
  validateGetPedidoById,
  getPedidoById
);

// POST
router.post(
  '/',
  authenticate,
  authorize(['orders']),
  validateCreatePedido,
  createPedido
);

// PUT
router.put(
  '/:id',
  authenticate,
  authorize(['orders']),
  validateUpdatePedidoRequest,
  updatePedido
);

router.put(
  '/:id/activate',
  authenticate,
  authorize(['orders']),
  validatePedidoStatusChange,
  changePedidoStatus
);

router.put(
  '/:id/deactivate',
  authenticate,
  authorize(['orders']),
  validatePedidoStatusChange,
  changePedidoStatus
);

export default router;