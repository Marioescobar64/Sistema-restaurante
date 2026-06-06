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

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints para la gestión de pedidos
 */

// ==========================================
//                   GET
// ==========================================

/**
 * @swagger
 * /orders/:
 *   get:
 *     summary: Obtener lista de pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente
 */
router.get('/', getPedidos);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtener un pedido por su ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido a buscar
 *     responses:
 *       200:
 *         description: Pedido obtenido exitosamente
 *       404:
 *         description: Pedido no encontrado
 */
router.get(
  '/:id',
  validateGetPedidoById,
  getPedidoById
);

// ==========================================
//                   POST
// ==========================================

/**
 * @swagger
 * /orders/:
 *   post:
 *     summary: Crear nuevo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/order'
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: Error de validación en los datos enviados
 */
router.post(
  '/',
  validateCreatePedido,
  createPedido
);

// ==========================================
//                   PUT
// ==========================================

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Actualizar información de un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/order'
 *     responses:
 *       200:
 *         description: Pedido actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Pedido no encontrado
 */
router.put(
  '/:id',
  validateUpdatePedidoRequest,
  updatePedido
);

/**
 * @swagger
 * /orders/{id}/activate:
 *   put:
 *     summary: Activar un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido a activar
 *     responses:
 *       200:
 *         description: Estado del pedido cambiado a activado
 *       404:
 *         description: Pedido no encontrado
 */
router.put(
  '/:id/activate',
  validatePedidoStatusChange,
  changePedidoStatus
);

/**
 * @swagger
 * /orders/{id}/deactivate:
 *   put:
 *     summary: Desactivar un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido a desactivar
 *     responses:
 *       200:
 *         description: Estado del pedido cambiado a desactivado
 *       404:
 *         description: Pedido no encontrado
 */
router.put(
  '/:id/deactivate',
  validatePedidoStatusChange,
  changePedidoStatus
);

export default router;