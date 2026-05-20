import { body, param } from "express-validator";
import { checkValidators } from "./check-validation.js";

// Validaciones para crear Administration
export const validateCreateAdministration = [

    body('restaurantName')
        .trim()
        .notEmpty()
        .withMessage('El nombre del restaurante es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre no puede tener más de 100 caracteres'),

    body('categoryType')
        .notEmpty()
        .withMessage('El tipo de categoría es requerido')
        .isIn(['FAMILIAR', 'ROMANTICO', 'GENERAL'])
        .withMessage('Tipo de categoría no válido'),

    body('capacity')
        .notEmpty()
        .withMessage('La capacidad es requerida')
        .isNumeric()
        .withMessage('La capacidad debe ser un número')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser mayor a 0'),

    body('administrators')
        .optional()
        .isArray()
        .withMessage('Los administradores deben ser un arreglo'),

    body('administrators.*.nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre del usuario administrativo es requerido')
        .isLength({ max: 80 })
        .withMessage('El nombre no puede exceder los 80 caracteres'),

    body('administrators.*.apellido')
        .trim()
        .notEmpty()
        .withMessage('El apellido del usuario administrativo es requerido')
        .isLength({ max: 80 })
        .withMessage('El apellido no puede exceder los 80 caracteres'),

    body('administrators.*.cargo')
        .trim()
        .notEmpty()
        .withMessage('El cargo del usuario administrativo es requerido')
        .isLength({ max: 80 })
        .withMessage('El cargo no puede exceder los 80 caracteres'),

    body('administrators.*.rol')
        .trim()
        .notEmpty()
        .withMessage('El rol del usuario administrativo es requerido')
        .isLength({ max: 80 })
        .withMessage('El rol no puede exceder los 80 caracteres'),

    body('photo')
        .optional()
        .isString()
        .withMessage('La foto debe ser una cadena de texto'),

    checkValidators,
];


// Validaciones para actualizar Administration
export const validateUpdateAdministration = [

    body('restaurantName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre no puede tener más de 100 caracteres'),

    body('categoryType')
        .optional()
        .isIn(['FAMILIAR', 'ROMANTICO', 'GENERAL'])
        .withMessage('Tipo de categoría no válido'),

    body('capacity')
        .optional()
        .isNumeric()
        .withMessage('La capacidad debe ser un número')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser mayor a 0'),

    body('administrators')
        .optional()
        .isArray()
        .withMessage('Los administradores deben ser un arreglo'),

    body('administrators.*.nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre del usuario administrativo es requerido')
        .isLength({ max: 80 })
        .withMessage('El nombre no puede exceder los 80 caracteres'),

    body('administrators.*.apellido')
        .trim()
        .notEmpty()
        .withMessage('El apellido del usuario administrativo es requerido')
        .isLength({ max: 80 })
        .withMessage('El apellido no puede exceder los 80 caracteres'),

    body('administrators.*.cargo')
        .trim()
        .notEmpty()
        .withMessage('El cargo del usuario administrativo es requerido')
        .isLength({ max: 80 })
        .withMessage('El cargo no puede exceder los 80 caracteres'),

    body('administrators.*.rol')
        .trim()
        .notEmpty()
        .withMessage('El rol del usuario administrativo es requerido')
        .isLength({ max: 80 })
        .withMessage('El rol no puede exceder los 80 caracteres'),

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