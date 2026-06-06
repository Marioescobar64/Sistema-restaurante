import { Router } from 'express';
import {
  getDetalles,
  getDetalleById,
  createDetalle,
  updateDetalle,
  changeDetalleStatus
} from './orderDetail-controller.js';

import {
  validateCreateDetalle,
  validateUpdateDetalleRequest,
  validateDetalleStatusChange,
  validateGetDetalleById
} from '../../middlewares/orderDetail-validation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: OrderDetails
 *   description: Endpoints para la gestión de detalles de orden
 */

// ==========================================
//                   GET
// ==========================================

/**
 * @swagger
 * /order-details/:
 *   get:
 *     summary: Obtener lista de detalles de orden
 *     tags: [OrderDetails]
 *     responses:
 *       200:
 *         description: Lista de detalles obtenida exitosamente
 */
router.get('/', getDetalles);

/**
 * @swagger
 * /order-details/{id}:
 *   get:
 *     summary: Obtener un detalle de orden por su ID
 *     tags: [OrderDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del detalle a buscar
 *     responses:
 *       200:
 *         description: Detalle obtenido exitosamente
 *       404:
 *         description: Detalle no encontrado
 */
router.get(
  '/:id',
  validateGetDetalleById,
  getDetalleById
);

// ==========================================
//                   POST
// ==========================================

/**
 * @swagger
 * /order-details/:
 *   post:
 *     summary: Crear nuevo detalle de orden
 *     tags: [OrderDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/orderDetail'
 *     responses:
 *       201:
 *         description: Detalle creado exitosamente
 *       400:
 *         description: Error de validación en los datos enviados
 */
router.post(
  '/',
  validateCreateDetalle,
  createDetalle
);

// ==========================================
//                   PUT
// ==========================================

/**
 * @swagger
 * /order-details/{id}:
 *   put:
 *     summary: Actualizar información de un detalle de orden
 *     tags: [OrderDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del detalle a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/orderDetail'
 *     responses:
 *       200:
 *         description: Detalle actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Detalle no encontrado
 */
router.put(
  '/:id',
  validateUpdateDetalleRequest,
  updateDetalle
);

/**
 * @swagger
 * /order-details/{id}/activate:
 *   put:
 *     summary: Activar un detalle de orden
 *     tags: [OrderDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del detalle a activar
 *     responses:
 *       200:
 *         description: Estado del detalle cambiado a activado
 *       404:
 *         description: Detalle no encontrado
 */
router.put(
  '/:id/activate',
  validateDetalleStatusChange,
  changeDetalleStatus
);

/**
 * @swagger
 * /order-details/{id}/deactivate:
 *   put:
 *     summary: Desactivar un detalle de orden
 *     tags: [OrderDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del detalle a desactivar
 *     responses:
 *       200:
 *         description: Estado del detalle cambiado a desactivado
 *       404:
 *         description: Detalle no encontrado
 */
router.put(
  '/:id/deactivate',
  validateDetalleStatusChange,
  changeDetalleStatus
);

export default router;