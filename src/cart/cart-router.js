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

/**
 * @swagger
 * tags:
 * name: Carts
 * description: Endpoints para la gestión de carritos de compras
 */

// ==========================================
//                   GET
// ==========================================

/**
 * @swagger
 * /carts/:
 * get:
 * summary: Obtener lista de carritos
 * tags: [Carts]
 * responses:
 * 200:
 * description: Lista de carritos obtenida exitosamente
 */
router.get('/', getCarts);

/**
 * @swagger
 * /carts/{id}:
 * get:
 * summary: Obtener un carrito por su ID
 * tags: [Carts]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID del carrito a buscar
 * responses:
 * 200:
 * description: Carrito obtenido exitosamente
 * 404:
 * description: Carrito no encontrado
 */
router.get(
  '/:id',
  validateGetCartById,
  getCartById
);

// ==========================================
//                   POST
// ==========================================

/**
 * @swagger
 * /carts/:
 * post:
 * summary: Agregar nuevo carrito
 * tags: [Carts]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/cart'
 * responses:
 * 201:
 * description: Carrito creado exitosamente
 * 400:
 * description: Error de validación en los datos enviados
 */
router.post(
  '/',
  validateCreateCart,
  createCart
);

// ==========================================
//                   PUT
// ==========================================

/**
 * @swagger
 * /carts/{id}:
 * put:
 * summary: Actualizar información de un carrito
 * tags: [Carts]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID del carrito a actualizar
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/cart'
 * responses:
 * 200:
 * description: Carrito actualizado exitosamente
 * 400:
 * description: Error de validación
 * 404:
 * description: Carrito no encontrado
 */
router.put(
  '/:id',
  validateUpdateCartRequest,
  updateCart
);

/**
 * @swagger
 * /carts/{id}/activate:
 * put:
 * summary: Activar un carrito
 * tags: [Carts]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID del carrito a activar
 * responses:
 * 200:
 * description: Estado del carrito cambiado a activado
 * 404:
 * description: Carrito no encontrado
 */
router.put(
  '/:id/activate',
  validateCartStatusChange,
  changeCartStatus
);

/**
 * @swagger
 * /carts/{id}/deactivate:
 * put:
 * summary: Desactivar un carrito
 * tags: [Carts]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID del carrito a desactivar
 * responses:
 * 200:
 * description: Estado del carrito cambiado a desactivado
 * 404:
 * description: Carrito no encontrado
 */
router.put(
  '/:id/deactivate',
  validateCartStatusChange,
  changeCartStatus
);

export default router;