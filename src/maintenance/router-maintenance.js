import { Router } from 'express';
import {
  getMaintenances,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  changeMaintenanceStatus,
} from './controller-maintenance.js';

import {
  validateCreateMaintenance,
  validateUpdateMaintenance,
  validateMaintenanceStatusChange,
  validateGetMaintenanceById,
} from '../../middlewares/validation-maintenace.js';

import { uploadFieldImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Maintenances
 *   description: Endpoints para la gestión de mantenimientos
 */

// ==========================================
//                   GET
// ==========================================

/**
 * @swagger
 * /maintenances/:
 *   get:
 *     summary: Obtener lista de mantenimientos
 *     tags: [Maintenances]
 *     responses:
 *       200:
 *         description: Lista de mantenimientos obtenida exitosamente
 */
router.get('/', getMaintenances);

/**
 * @swagger
 * /maintenances/{id}:
 *   get:
 *     summary: Obtener un mantenimiento por su ID
 *     tags: [Maintenances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del mantenimiento a buscar
 *     responses:
 *       200:
 *         description: Mantenimiento obtenido exitosamente
 *       404:
 *         description: Mantenimiento no encontrado
 */
router.get(
  '/:id',
  validateGetMaintenanceById,
  getMaintenanceById
);

// ==========================================
//                   POST
// ==========================================

/**
 * @swagger
 * /maintenances/:
 *   post:
 *     summary: Crear nuevo mantenimiento
 *     tags: [Maintenances]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/maintenance'
 *     responses:
 *       201:
 *         description: Mantenimiento creado exitosamente
 *       400:
 *         description: Error de validación en los datos enviados
 */
router.post(
  '/',
  uploadFieldImage.single('photo'),
  cleanupUploadedFileOnFinish,
  validateCreateMaintenance,
  createMaintenance
);

// ==========================================
//                   PUT
// ==========================================

/**
 * @swagger
 * /maintenances/{id}:
 *   put:
 *     summary: Actualizar información de un mantenimiento
 *     tags: [Maintenances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del mantenimiento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/maintenance'
 *     responses:
 *       200:
 *         description: Mantenimiento actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Mantenimiento no encontrado
 */
router.put(
  '/:id',
  uploadFieldImage.single('photo'),
  validateUpdateMaintenance,
  updateMaintenance
);

/**
 * @swagger
 * /maintenances/{id}/activate:
 *   put:
 *     summary: Activar un mantenimiento
 *     tags: [Maintenances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del mantenimiento a activar
 *     responses:
 *       200:
 *         description: Estado del mantenimiento cambiado a activado
 *       404:
 *         description: Mantenimiento no encontrado
 */
router.put(
  '/:id/activate',
  validateMaintenanceStatusChange,
  changeMaintenanceStatus
);

/**
 * @swagger
 * /maintenances/{id}/deactivate:
 *   put:
 *     summary: Desactivar un mantenimiento
 *     tags: [Maintenances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del mantenimiento a desactivar
 *     responses:
 *       200:
 *         description: Estado del mantenimiento cambiado a desactivado
 *       404:
 *         description: Mantenimiento no encontrado
 */
router.put(
  '/:id/deactivate',
  validateMaintenanceStatusChange,
  changeMaintenanceStatus
);

export default router;