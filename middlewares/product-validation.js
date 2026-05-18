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

  body('cantidad')
    .notEmpty().withMessage('La cantidad es obligatoria')
    .isFloat({ min: 0 }).withMessage('La cantidad no puede ser negativa')
    .toFloat(), // Convierte el string del frontend a número real

  body('cantidadObtenida')
    .notEmpty().withMessage('La cantidad obtenida es obligatoria')
    .isFloat({ min: 0 }).withMessage('La cantidad obtenida no puede ser negativa')
    .toFloat(),

  body('fechaExp')
    .notEmpty().withMessage('La fecha de expiración es obligatoria')
    .isISO8601().withMessage('Debe ser una fecha válida')
    .toDate(), // Convierte a objeto Date de Javascript

  body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0 }).withMessage('El precio no puede ser negativo')
    .toFloat(),

  // checkFalsy: true permite que si mandan un string vacío "", lo acepte como opcional válido
  body('descripcion')
    .optional({ checkFalsy: true })
    .trim(),

  body('categoria')
    .optional({ checkFalsy: true })
    .trim(),

  checkValidators,
];

// ==============================
// UPDATE
// ==============================
export const validateUpdateProductoRequest = [

  param('id')
    .isMongoId().withMessage('ID inválido'),

  body('nombre')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),

  body('cantidad')
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 }).withMessage('La cantidad no puede ser negativa')
    .toFloat(),

  body('cantidadObtenida')
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 }).withMessage('La cantidad obtenida no puede ser negativa')
    .toFloat(),

  body('fechaExp')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('Debe ser una fecha válida')
    .toDate(),

  body('precio')
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 }).withMessage('El precio no puede ser negativo')
    .toFloat(),

  body('descripcion')
    .optional({ checkFalsy: true })
    .trim(),

  body('categoria')
    .optional({ checkFalsy: true })
    .trim(),

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