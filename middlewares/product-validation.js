import { body, param } from 'express-validator';
import { checkValidators } from './check-validation.js';

// ==============================
// CREATE
// ==============================
export const validateCreateProducto = [

  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),

  body('descripcion')
    .trim()
    .notEmpty().withMessage('La descripción es obligatoria'),

  body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0 }).withMessage('El precio no puede ser negativo'),

  body('categoria')
    .trim()
    .notEmpty().withMessage('La categoría es obligatoria'),

  checkValidators,
];

// ==============================
// UPDATE
// ==============================
export const validateUpdateProductoRequest = [

  param('id')
    .isMongoId().withMessage('ID inválido'),

  body('nombre')
    .optional()
    .isLength({ max: 100 }),

  body('precio')
    .optional()
    .isFloat({ min: 0 }),

  checkValidators,
];

// ==============================
// STATUS CHANGE
// ==============================
export const validateProductoStatusChange = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// ==============================
// GET BY ID
// ==============================
export const validateGetProductoById = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];