import { body, param } from 'express-validator';
import { checkValidators } from './check-validation.js';

export const validateCreateBranch = [
    body('name')
        .notEmpty().withMessage('El nombre de la sucursal es requerido')
        .isLength({ max: 100 }).withMessage('El nombre no puede exceder los 100 caracteres'),
    body('branchType')
        .notEmpty().withMessage('El tipo de sucursal es requerido')
        .isIn(['Restaurante', 'Bar', 'Cafetería', 'General']).withMessage('Tipo de sucursal no válido'),
    checkValidators
];

export const validateUpdateBranch = [
    param('id').isMongoId().withMessage('No es un ID válido de Mongo'),
    body('name')
        .optional()
        .isLength({ max: 100 }).withMessage('El nombre no puede exceder los 100 caracteres'),
    body('branchType')
        .optional()
        .isIn(['Restaurante', 'Bar', 'Cafetería', 'General']).withMessage('Tipo de sucursal no válido'),
    checkValidators
];

export const validateAssignStaff = [
    param('id').isMongoId().withMessage('No es un ID válido de Mongo para la sucursal'),
    body('staffId').notEmpty().withMessage('El ID del staff es requerido'),
    checkValidators
];

export const validateGetBranchById = [
    param('id').isMongoId().withMessage('No es un ID válido de Mongo'),
    checkValidators
];
