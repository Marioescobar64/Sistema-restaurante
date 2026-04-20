import { Router } from 'express';
import {
  getMesas,
  getMesaById,
  createMesa,
  updateMesa,
  changeMesaStatus
} from './table-controller.js';

import {
  validateCreateMesa,
  validateUpdateMesaRequest,
  validateMesaStatusChange,
  validateGetMesaById
} from '../../middlewares/table-validation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tables
 *   description: Endpoints para la gestión de mesas
 */

// ==========================================
//                   GET
// ==========================================

/**
 * @swagger
 * /tables/:
 *   get:
 *     summary: Obtener lista de mesas
 *     tags: [Tables]
 *     responses:
 *       200:
 *         description: Lista de mesas obtenida exitosamente
 */
router.get('/', getMesas);

/**
 * @swagger
 * /tables/{id}:
 *   get:
 *     summary: Obtener una mesa por su ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mesa a buscar
 *     responses:
 *       200:
 *         description: Mesa obtenida exitosamente
 *       404:
 *         description: Mesa no encontrada
 */
router.get(
  '/:id',
  validateGetMesaById,
  getMesaById
);

// ==========================================
//                   POST
// ==========================================

/**
 * @swagger
 * /tables/:
 *   post:
 *     summary: Crear nueva mesa
 *     tags: [Tables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/table'
 *     responses:
 *       201:
 *         description: Mesa creada exitosamente
 *       400:
 *         description: Error de validación en los datos enviados
 */
router.post(
  '/',
  validateCreateMesa,
  createMesa
);

// ==========================================
//                   PUT
// ==========================================

/**
 * @swagger
 * /tables/{id}:
 *   put:
 *     summary: Actualizar información de una mesa
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mesa a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/table'
 *     responses:
 *       200:
 *         description: Mesa actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Mesa no encontrada
 */
router.put(
  '/:id',
  validateUpdateMesaRequest,
  updateMesa
);

/**
 * @swagger
 * /tables/{id}/activate:
 *   put:
 *     summary: Activar una mesa
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mesa a activar
 *     responses:
 *       200:
 *         description: Estado de la mesa cambiado a activado
 *       404:
 *         description: Mesa no encontrada
 */
router.put(
  '/:id/activate',
  validateMesaStatusChange,
  changeMesaStatus
);

/**
 * @swagger
 * /tables/{id}/deactivate:
 *   put:
 *     summary: Desactivar una mesa
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mesa a desactivar
 *     responses:
 *       200:
 *         description: Estado de la mesa cambiado a desactivado
 *       404:
 *         description: Mesa no encontrada
 */
router.put(
  '/:id/deactivate',
  validateMesaStatusChange,
  changeMesaStatus
);

export default router;