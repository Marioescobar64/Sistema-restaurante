import { Router } from 'express';
import {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  changeMenuStatus,
} from './controller-menu.js';

import {
  validateCreateMenu,
  validateUpdateMenu,
  validateMenuStatusChange,
  validateGetMenuById,
} from '../../middlewares/validation-menu.js';

import { uploadFieldImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Menus
 *   description: Endpoints para la gestión de menús
 */

// ==========================================
//                   GET
// ==========================================

/**
 * @swagger
 * /menus/:
 *   get:
 *     summary: Obtener lista de menús
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: Lista de menús obtenida exitosamente
 */
router.get('/', getMenus);

/**
 * @swagger
 * /menus/{id}:
 *   get:
 *     summary: Obtener un menú por su ID
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del menú a buscar
 *     responses:
 *       200:
 *         description: Menú obtenido exitosamente
 *       404:
 *         description: Menú no encontrado
 */
router.get(
  '/:id',
  validateGetMenuById,
  getMenuById
);

// ==========================================
//                   POST
// ==========================================

/**
 * @swagger
 * /menus/:
 *   post:
 *     summary: Crear nuevo menú
 *     tags: [Menus]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/menu'
 *     responses:
 *       201:
 *         description: Menú creado exitosamente
 *       400:
 *         description: Error de validación en los datos enviados
 */
router.post(
  '/',
  uploadFieldImage.single('photo'),
  cleanupUploadedFileOnFinish,
  validateCreateMenu,
  createMenu
);

// ==========================================
//                   PUT
// ==========================================

/**
 * @swagger
 * /menus/{id}:
 *   put:
 *     summary: Actualizar información de un menú
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del menú a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/menu'
 *     responses:
 *       200:
 *         description: Menú actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Menú no encontrado
 */
router.put(
  '/:id',
  uploadFieldImage.single('photo'),
  validateUpdateMenu,
  updateMenu
);

/**
 * @swagger
 * /menus/{id}/activate:
 *   put:
 *     summary: Activar un menú
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del menú a activar
 *     responses:
 *       200:
 *         description: Estado del menú cambiado a activado
 *       404:
 *         description: Menú no encontrado
 */
router.put(
  '/:id/activate',
  validateMenuStatusChange,
  changeMenuStatus
);

/**
 * @swagger
 * /menus/{id}/deactivate:
 *   put:
 *     summary: Desactivar un menú
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del menú a desactivar
 *     responses:
 *       200:
 *         description: Estado del menú cambiado a desactivado
 *       404:
 *         description: Menú no encontrado
 */
router.put(
  '/:id/deactivate',
  validateMenuStatusChange,
  changeMenuStatus
);

export default router;