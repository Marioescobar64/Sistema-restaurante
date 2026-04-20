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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para la gestión de productos
 */

// ==========================================
//                   GET
// ==========================================

/**
 * @swagger
 * /products/:
 *   get:
 *     summary: Obtener lista de productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 */
router.get('/', getProductos);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a buscar
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', validateGetProductoById, getProductoById);

// ==========================================
//                   POST
// ==========================================

/**
 * @swagger
 * /products/:
 *   post:
 *     summary: Crear nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error de validación en los datos enviados
 */
router.post('/', validateCreateProducto, createProducto);

// ==========================================
//                   PUT
// ==========================================

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar información de un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', validateUpdateProductoRequest, updateProducto);

/**
 * @swagger
 * /products/{id}/activate:
 *   put:
 *     summary: Activar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a activar
 *     responses:
 *       200:
 *         description: Estado del producto cambiado a activado
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id/activate', validateProductoStatusChange, changeProductoStatus);

/**
 * @swagger
 * /products/{id}/deactivate:
 *   put:
 *     summary: Desactivar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a desactivar
 *     responses:
 *       200:
 *         description: Estado del producto cambiado a desactivado
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id/deactivate', validateProductoStatusChange, changeProductoStatus);

export default router;