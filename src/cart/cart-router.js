import { Router } from 'express';
import {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  changeCartStatus
} from './cart-controller.js';

import {
  validateCreateCart,
  validateUpdateCartRequest,
  validateCartStatusChange,
  validateGetCartById
} from '../../middlewares/validation-cart.js';
import { authenticate, authorize } from '../../middlewares/auth-middleware.js';

const router = Router();

// GET
router.get('/', authenticate, authorize(['cart']), getCarts);

router.get(
  '/:id',
  authenticate,
  authorize(['cart']),
  validateGetCartById,
  getCartById
);

// POST
router.post(
  '/',
  authenticate,
  authorize(['cart']),
  validateCreateCart,
  createCart
);

// PUT
router.put(
  '/:id',
  authenticate,
  authorize(['cart']),
  validateUpdateCartRequest,
  updateCart
);

router.put(
  '/:id/activate',
  authenticate,
  authorize(['cart']),
  changeCartStatus
);

router.put(
  '/:id/deactivate',
  authenticate,
  authorize(['cart']),
  changeCartStatus
);

export default router;