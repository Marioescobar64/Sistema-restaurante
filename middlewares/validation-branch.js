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
    body('role').notEmpty().withMessage('El rol es requerido').isIn(['GERENTE_ROLE', 'CHEF_ROLE', 'MESERO_ROLE']).withMessage('El rol debe ser GERENTE_ROLE, CHEF_ROLE o MESERO_ROLE'),
    body('staffId').optional({ nullable: true }).isMongoId().withMessage('El ID del staff debe ser un ObjectId válido'),
    body('staffIds').optional({ nullable: true }).isArray({ min: 1 }).withMessage('staffIds debe ser un arreglo con al menos un ID'),
    body('staffIds.*').optional().isMongoId().withMessage('Cada ID de staff debe ser un ObjectId válido'),
    body().custom((value, { req }) => {
        const hasSingleStaff = Boolean(req.body.staffId);
        const hasMultipleStaff = Array.isArray(req.body.staffIds) && req.body.staffIds.length > 0;

        if (!hasSingleStaff && !hasMultipleStaff) {
            throw new Error('Se requiere al menos un ID de personal para asignar a la sucursal');
        }

        return true;
    }),
    checkValidators
];

export const validateGetBranchById = [
    param('id').isMongoId().withMessage('No es un ID válido de Mongo'),
    checkValidators
];
