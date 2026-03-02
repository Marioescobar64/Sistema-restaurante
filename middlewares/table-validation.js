import { body, param } from 'express-validator';
import { checkValidators } from './check-validation.js';

// CREATE
export const validateCreateMesa = [

  body('descripcion')
    .notEmpty().withMessage('Descripción obligatoria'),

  body('numeroMesa')
    .isInt({ min: 1 }).withMessage('Número inválido'),

  body('capacidad')
    .isInt({ min: 1 }).withMessage('Capacidad inválida'),

  body('estado')
    .optional()
    .isIn(['Disponible', 'Ocupada', 'Reservada'])
    .withMessage('Estado inválido'),

  checkValidators,
];

// UPDATE
export const validateUpdateMesaRequest = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// STATUS
export const validateMesaStatusChange = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// GET BY ID
export const validateGetMesaById = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];