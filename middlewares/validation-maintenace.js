import { body, param } from "express-validator";
import { checkValidators } from "./check-validation.js";

// Validaciones para crear Maintenance
export const validateCreateMaintenance = [

    body('tableNumber')
        .notEmpty()
        .withMessage('El número de mesa es requerido')
        .isInt({ min: 1 })
        .withMessage('El número de mesa debe ser un número entero mayor a 0'),

    body('capacity')
        .notEmpty()
        .withMessage('La capacidad es requerida')
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser un número entero mayor a 0'),

    body('location')
        .notEmpty()
        .withMessage('La ubicación es requerida')
        .isIn(['Salón Principal', 'Terraza', 'Área VIP', 'Jardín', 'Interior'])
        .withMessage('Ubicación no válida'),

    body('status')
        .optional()
        .isIn(['Disponible', 'Ocupada', 'Reservada', 'Mantenimiento'])
        .withMessage('Estado no válido'),

    body('photo')
        .optional()
        .isString()
        .withMessage('La foto debe ser una cadena de texto'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive debe ser un valor booleano'),

    checkValidators,
];

// Validaciones para actualizar Maintenance
export const validateUpdateMaintenance = [

    body('tableNumber')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El número de mesa debe ser un número entero mayor a 0'),

    body('capacity')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La capacidad debe ser un número entero mayor a 0'),

    body('location')
        .optional()
        .isIn(['Salón Principal', 'Terraza', 'Área VIP', 'Jardín', 'Interior'])
        .withMessage('Ubicación no válida'),

    body('status')
        .optional()
        .isIn(['Disponible', 'Ocupada', 'Reservada', 'Mantenimiento'])
        .withMessage('Estado no válido'),

    body('photo')
        .optional()
        .isString()
        .withMessage('La foto debe ser una cadena de texto'),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive debe ser un valor booleano'),

    checkValidators,
];

// Validación para cambiar estado (activar / desactivar)
export const validateMaintenanceStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),

    body('isActive')
        .notEmpty()
        .withMessage('El estado isActive es requerido')
        .isBoolean()
        .withMessage('isActive debe ser un valor booleano'),

    checkValidators,
];

// Validación para obtener Maintenance por ID
export const validateGetMaintenanceById = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),

    checkValidators,
];