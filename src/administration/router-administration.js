import { Router } from 'express';
import {
  getAdministrations,
  getAdministrationById,
  createAdministration,
  updateAdministration,
  changeAdministrationStatus,
} from './controller-administration.js';

import {
  validateCreateAdministration,
  validateUpdateAdministration,
  validateAdministrationStatusChange,
  validateGetAdministrationById,
} from '../../middlewares/validation-administration.js';

import { uploadFieldImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Administrations
 *   description: Endpoints para la gestión de restaurantes
 */

// ==========================================
//                   GET
// ==========================================

/**
 * @swagger
 * /administrations/:
 *   get:
 *     summary: Obtener lista de restaurantes
 *     tags: [Administrations]
 *     responses:
 *       200:
 *         description: Lista de restaurantes obtenida exitosamente
 */
router.get('/', getAdministrations);

/**
 * @swagger
 * /administrations/{id}:
 *   get:
 *     summary: Obtener un restaurante por su ID
 *     tags: [Administrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante a buscar
 *     responses:
 *       200:
 *         description: Restaurante obtenido exitosamente
 *       404:
 *         description: Restaurante no encontrado
 */
router.get(
  '/:id',
  validateGetAdministrationById,
  getAdministrationById
);

// ==========================================
//                   POST
// ==========================================

/**
 * @swagger
 * /administrations/:
 *   post:
 *     summary: Crear nuevo restaurante
 *     tags: [Administrations]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/administration'
 *     responses:
 *       201:
 *         description: Restaurante creado exitosamente
 *       400:
 *         description: Error de validación en los datos enviados
 */
router.post(
  '/',
  uploadFieldImage.single('photo'),
  cleanupUploadedFileOnFinish,
  validateCreateAdministration,
  createAdministration
);

// ==========================================
//                   PUT
// ==========================================

/**
 * @swagger
 * /administrations/{id}:
 *   put:
 *     summary: Actualizar información de un restaurante
 *     tags: [Administrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/administration'
 *     responses:
 *       200:
 *         description: Restaurante actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Restaurante no encontrado
 */
router.put(
  '/:id',
  uploadFieldImage.single('photo'),
  validateUpdateAdministration,
  updateAdministration
);

/**
 * @swagger
 * /administrations/{id}/activate:
 *   put:
 *     summary: Activar un restaurante
 *     tags: [Administrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante a activar
 *     responses:
 *       200:
 *         description: Estado del restaurante cambiado a activado
 *       404:
 *         description: Restaurante no encontrado
 */
router.put(
  '/:id/activate',
  validateAdministrationStatusChange,
  changeAdministrationStatus
);

/**
 * @swagger
 * /administrations/{id}/deactivate:
 *   put:
 *     summary: Desactivar un restaurante
 *     tags: [Administrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante a desactivar
 *     responses:
 *       200:
 *         description: Estado del restaurante cambiado a desactivado
 *       404:
 *         description: Restaurante no encontrado
 */
router.put(
  '/:id/deactivate',
  validateAdministrationStatusChange,
  changeAdministrationStatus
);

export default router;