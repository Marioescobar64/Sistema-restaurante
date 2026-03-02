import { body, param } from 'express-validator';
import { checkValidators } from './check-validation.js';

// CREATE
export const validateCreateEvento = [

  body('nombreEvento')
    .notEmpty().withMessage('Nombre obligatorio')
    .isLength({ max: 150 }),

  body('descripcion')
    .notEmpty().withMessage('Descripción obligatoria'),

  body('fecha')
    .isISO8601().withMessage('Fecha inválida'),

  body('horaInicio')
    .notEmpty().withMessage('Hora inicio obligatoria'),

  body('horaFin')
    .notEmpty().withMessage('Hora fin obligatoria'),

  checkValidators,
];

// UPDATE
export const validateUpdateEventoRequest = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// STATUS
export const validateEventoStatusChange = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// GET BY ID
export const validateGetEventoById = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];