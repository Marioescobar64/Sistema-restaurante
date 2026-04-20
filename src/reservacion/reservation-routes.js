import { Router } from 'express';
import {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  changeReservaStatus
} from './reservation-controller.js';

import {
  validateCreateReserva,
  validateUpdateReservaRequest,
  validateReservaStatusChange,
  validateGetReservaById
} from '../../middlewares/reservation-validation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Endpoints para la gestión de reservaciones
 */

// ==========================================
//                   GET
// ==========================================

/**
 * @swagger
 * /reservations/:
 *   get:
 *     summary: Obtener lista de reservaciones
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Lista de reservaciones obtenida exitosamente
 */
router.get('/', getReservas);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Obtener una reservación por su ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reservación a buscar
 *     responses:
 *       200:
 *         description: Reservación obtenida exitosamente
 *       404:
 *         description: Reservación no encontrada
 */
router.get(
  '/:id',
  validateGetReservaById,
  getReservaById
);

// ==========================================
//                   POST
// ==========================================

/**
 * @swagger
 * /reservations/:
 *   post:
 *     summary: Crear nueva reservación
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/reservation'
 *     responses:
 *       201:
 *         description: Reservación creada exitosamente
 *       400:
 *         description: Error de validación en los datos enviados
 */
router.post(
  '/',
  validateCreateReserva,
  createReserva
);

// ==========================================
//                   PUT
// ==========================================

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Actualizar información de una reservación
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reservación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/reservation'
 *     responses:
 *       200:
 *         description: Reservación actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Reservación no encontrada
 */
router.put(
  '/:id',
  validateUpdateReservaRequest,
  updateReserva
);

/**
 * @swagger
 * /reservations/{id}/activate:
 *   put:
 *     summary: Activar una reservación
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reservación a activar
 *     responses:
 *       200:
 *         description: Estado de la reservación cambiado a activado
 *       404:
 *         description: Reservación no encontrada
 */
router.put(
  '/:id/activate',
  validateReservaStatusChange,
  changeReservaStatus
);

/**
 * @swagger
 * /reservations/{id}/deactivate:
 *   put:
 *     summary: Desactivar una reservación
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reservación a desactivar
 *     responses:
 *       200:
 *         description: Estado de la reservación cambiado a desactivado
 *       404:
 *         description: Reservación no encontrada
 */
router.put(
  '/:id/deactivate',
  validateReservaStatusChange,
  changeReservaStatus
);

export default router;