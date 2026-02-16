import { body, param } from "express-validator";
import { checkValidators } from "./check-validation.js";

// Validaciones para crear Administration
export const validateCreateAdministration = [

    body('restaurantdName')
        .trim()
        .notEmpty()
        .withMessage('El nombre del restaurante es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre no puede tener más de 100 caracteres'),

    body('categoryType')
        .notEmpty()
        .withMessage('El tipo de categoría es requerido')
        .isIn(['Familiar', 'Romantico', 'General'])
        .withMessage('Tipo de categoría no válido'),

    body('capacity')
        .notEmpty()
        .withMessage('La capacidad es requerida')
        .isNumeric()
        .withMessage('La capacidad debe ser un número')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser mayor a 0'),

    body('photo')
        .optional()
        .isString()
        .withMessage('La foto debe ser una cadena de texto'),

    checkValidators,
];


// Validaciones para actualizar Administration
export const validateUpdateAdministration = [

    body('restaurantdName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre no puede tener más de 100 caracteres'),

    body('categoryType')
        .optional()
        .isIn(['Familiar', 'Romantico', 'General'])
        .withMessage('Tipo de categoría no válido'),

    body('capacity')
        .optional()
        .isNumeric()
        .withMessage('La capacidad debe ser un número')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser mayor a 0'),

    body('photo')
        .optional()
        .isString()
        .withMessage('La foto debe ser una cadena de texto'),

    checkValidators,
];


// Validación para cambiar estado (activar / desactivar)
export const validateAdministrationStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),

    checkValidators,
];


// Validación para obtener Administration por ID
export const validateGetAdministrationById = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),

    checkValidators,
];