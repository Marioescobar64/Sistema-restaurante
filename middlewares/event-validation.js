import { body, param } from 'express-validator';
import { checkValidators } from './check-validation.js';

// CREATE
export const validateCreateEvento = [

  body('nombreEvento')
    .notEmpty().withMessage('Nombre obligatorio')
    .isLength({ max: 150 }),

  body('descripcion')
    .notEmpty().withMessage('Descripción obligatoria'),

  body('fechaInicio')
    .optional()
    .isISO8601().withMessage('Fecha de inicio inválida'),



  body()
    .custom((value, { req }) => {
      if (!req.body.fechaInicio && !req.body.fecha) {
        throw new Error('La fecha de inicio es obligatoria');
      }
      return true;
    }),

  body('fechaFin')
    .notEmpty().withMessage('Fecha de fin obligatoria')
    .isISO8601().withMessage('Fecha de fin inválida'),

  body('horaInicio')
    .notEmpty().withMessage('Hora inicio obligatoria'),

  body('horaFin')
    .notEmpty().withMessage('Hora fin obligatoria'),

  body('estado')
    .optional()
    .isIn(['Programado', 'En curso', 'Finalizado', 'Cancelado'])
    .withMessage('Estado inválido'),

  checkValidators,
];

// UPDATE
export const validateUpdateEventoRequest = [
  param('id').isMongoId().withMessage('ID inválido'),
  body('fechaInicio')
    .optional()
    .isISO8601().withMessage('Fecha de inicio inválida'),
  body('fechaFin')
    .optional()
    .isISO8601().withMessage('Fecha de fin inválida'),
  body('estado')
    .optional()
    .isIn(['Programado', 'En curso', 'Finalizado', 'Cancelado'])
    .withMessage('Estado inválido'),
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