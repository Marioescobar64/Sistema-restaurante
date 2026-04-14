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

const router = Router();

// GET
router.get('/', getCarts);

router.get(
  '/:id',
  validateGetCartById,
  getCartById
);

// POST
router.post(
  '/',
  validateCreateCart,
  createCart
);

// PUT
router.put(
  '/:id',
  validateUpdateCartRequest,
  updateCart
);

router.put(
  '/:id/activate',
  validateCartStatusChange,
  changeCartStatus
);

router.put(
  '/:id/deactivate',
  validateCartStatusChange,
  changeCartStatus
);

export default router;