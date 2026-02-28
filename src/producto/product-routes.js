import { Router } from 'express';
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  changeProductoStatus
} from './product-controller.js';

import {
  validateCreateProducto,
  validateUpdateProductoRequest,
  validateProductoStatusChange,
  validateGetProductoById
} from '../../middlewares/product-validation.js';

const router = Router();

router.get('/', getProductos);
router.get('/:id', validateGetProductoById, getProductoById);
router.post('/', validateCreateProducto, createProducto);
router.put('/:id', validateUpdateProductoRequest, updateProducto);
router.put('/:id/activate', validateProductoStatusChange, changeProductoStatus);
router.put('/:id/deactivate', validateProductoStatusChange, changeProductoStatus);

export default router;