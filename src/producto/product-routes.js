import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  changeProductStatus,
} from './product-controller.js';

import {
  validateCreateProduct,
  validateUpdateProduct,
  validateProductStatusChange,
  validateGetProductById,
} from '../../middlewares/product-validation.js';

const router = Router();

router.get('/', getProducts);

router.get('/:id', validateGetProductById, getProductById);

router.post('/', validateCreateProduct, createProduct);

router.put('/:id', validateUpdateProduct, updateProduct);

router.put('/:id/activate', validateProductStatusChange, changeProductStatus);

router.put('/:id/deactivate', validateProductStatusChange, changeProductStatus);

export default router;