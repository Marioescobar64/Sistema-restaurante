import { body, param } from 'express-validator';
import { checkValidators } from './check-validation.js';

// CREATE
export const validateCreateDetalle = [

  body('descripcion')
    .notEmpty().withMessage('Descripción obligatoria'),

  body('cantidad')
    .isInt({ min: 1 }).withMessage('Cantidad inválida'),

  body('precioUnitario')
    .isFloat({ min: 0 }).withMessage('Precio inválido'),

  body('subtotal')
    .isFloat({ min: 0 }).withMessage('Subtotal inválido'),

  checkValidators,
];

// UPDATE
export const validateUpdateDetalleRequest = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// STATUS
export const validateDetalleStatusChange = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// GET BY ID
export const validateGetDetalleById = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];