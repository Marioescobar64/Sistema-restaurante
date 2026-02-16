import { body, param } from "express-validator";
import { validateFields } from "../../middlewares/check-validation.js"; // Ajusta esta ruta si es necesario

// Validar creación de menú
export const validateCreateMenu = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),
  body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser numérico"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser texto"),
  validateFields,
];

// Validar actualización de menú
export const validateUpdateMenuRequest = [
  param("id")
    .isMongoId()
    .withMessage("ID inválido"),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío"),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("El precio debe ser numérico"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser texto"),
  validateFields,
];

// Validar cambio de estado del menú
export const validateMenuStatusChange = [
  param("id")
    .isMongoId()
    .withMessage("ID inválido"),
  validateFields,
];

// Validar obtener menú por ID
export const validateGetMenuById = [
  param("id")
    .isMongoId()
    .withMessage("ID inválido"),
  validateFields,
];