import { body, param } from 'express-validator';
import { checkValidators } from './check-validation.js';

// CREATE
export const validateCreatePedido = [

  body('nombrePedido')
    .notEmpty().withMessage('Nombre obligatorio')
    .isLength({ max: 100 }),

  body('descripcion')
    .notEmpty().withMessage('Descripción obligatoria'),

  body('total')
    .isFloat({ min: 0 }).withMessage('Total inválido'),

  body('estado')
    .optional()
    .isIn(['Pendiente', 'En proceso', 'Entregado', 'Cancelado'])
    .withMessage('Estado inválido'),

  checkValidators,
];

// UPDATE
export const validateUpdatePedidoRequest = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// STATUS
export const validatePedidoStatusChange = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// GET BY ID
export const validateGetPedidoById = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];