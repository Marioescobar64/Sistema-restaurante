import { body, param } from 'express-validator';
import { checkValidators } from './check-validation.js';

// CREATE
export const validateCreateCart = [

  body('orderId')
    .notEmpty().withMessage('El pedido es obligatorio')
    .isMongoId().withMessage('ID de pedido inválido'),

  body('items')
    .isArray({ min: 1 }).withMessage('Debe agregar al menos un producto'),

  body('items.*.menuItem')
    .notEmpty().withMessage('El platillo es obligatorio')
    .isMongoId().withMessage('ID de platillo inválido'),

  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('Cantidad inválida'),

  body('items.*.price')
    .isFloat({ min: 0 }).withMessage('Precio inválido'),

  body('items.*.subtotal')
    .isFloat({ min: 0 }).withMessage('Subtotal inválido'),

  body('total')
    .optional()
    .isFloat({ min: 0 }).withMessage('Total inválido'),

  body('status')
    .optional()
    .isIn(['activo', 'confirmado', 'cancelado'])
    .withMessage('Estado inválido'),

  checkValidators,
];

// UPDATE
export const validateUpdateCartRequest = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// STATUS
export const validateCartStatusChange = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// GET BY ID
export const validateGetCartById = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];