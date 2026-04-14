import { body, param } from 'express-validator';
import { checkValidators } from './check-validation.js';

// CREATE
export const validateCreateReserva = [

  body('eventoId')
    .notEmpty().withMessage('El evento es obligatorio')
    .isMongoId().withMessage('ID de evento inválido'),

  body('descripcion')
    .notEmpty().withMessage('Descripción obligatoria'),

  body('usuario')
    .notEmpty().withMessage('Usuario obligatorio'),

  body('mesa')
    .isInt({ min: 1 }).withMessage('Mesa inválida'),

  body('fecha')
    .isISO8601().withMessage('Fecha inválida'),

  body('hora')
    .notEmpty().withMessage('Hora obligatoria'),

  body('cantidadPersonas')
    .isInt({ min: 1 }).withMessage('Cantidad inválida'),

  body('estado')
    .optional()
    .isIn(['Activa', 'Cancelada', 'Finalizada'])
    .withMessage('Estado inválido'),

  checkValidators,
];

// UPDATE
export const validateUpdateReservaRequest = [

  param('id')
    .isMongoId().withMessage('ID inválido'),

  body('cantidadPersonas')
    .optional()
    .isInt({ min: 1 }),

  checkValidators,
];

// STATUS
export const validateReservaStatusChange = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];

// GET BY ID
export const validateGetReservaById = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];