import { Router } from 'express';
import {
  getEventos,
  getEventoById,
  createEvento,
  updateEvento,
  changeEventoStatus
} from './event-controller.js';

import {
  validateCreateEvento,
  validateUpdateEventoRequest,
  validateEventoStatusChange,
  validateGetEventoById
} from '../../middlewares/event-validation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Endpoints para la gestión de eventos
 */

// ==========================================
//                   GET
// ==========================================

/**
 * @swagger
 * /events/:
 *   get:
 *     summary: Obtener lista de eventos
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida exitosamente
 */
router.get('/', getEventos);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Obtener un evento por su ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento a buscar
 *     responses:
 *       200:
 *         description: Evento obtenido exitosamente
 *       404:
 *         description: Evento no encontrado
 */
router.get(
  '/:id',
  validateGetEventoById,
  getEventoById
);

// ==========================================
//                   POST
// ==========================================

/**
 * @swagger
 * /events/:
 *   post:
 *     summary: Crear nuevo evento
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *       400:
 *         description: Error de validación en los datos enviados
 */
router.post(
  '/',
  validateCreateEvento,
  createEvento
);

// ==========================================
//                   PUT
// ==========================================

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Actualizar información de un evento
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Evento no encontrado
 */
router.put(
  '/:id',
  validateUpdateEventoRequest,
  updateEvento
);

/**
 * @swagger
 * /events/{id}/activate:
 *   put:
 *     summary: Activar un evento
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento a activar
 *     responses:
 *       200:
 *         description: Estado del evento cambiado a activado
 *       404:
 *         description: Evento no encontrado
 */
router.put(
  '/:id/activate',
  validateEventoStatusChange,
  changeEventoStatus
);

/**
 * @swagger
 * /events/{id}/deactivate:
 *   put:
 *     summary: Desactivar un evento
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento a desactivar
 *     responses:
 *       200:
 *         description: Estado del evento cambiado a desactivado
 *       404:
 *         description: Evento no encontrado
 */
router.put(
  '/:id/deactivate',
  validateEventoStatusChange,
  changeEventoStatus
);

export default router;