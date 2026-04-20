import { body, param } from "express-validator";
import { checkValidators } from "./check-validation.js";

// CREATE
export const validateCreateMenu = [
  body("saucerName")
    .notEmpty().withMessage("El nombre del platillo es obligatorio")
    .isLength({ max: 255 }).withMessage("Máximo 255 caracteres"),

  body("categoryType")
    .notEmpty().withMessage("La categoría es requerida")
    .isIn(["Platillo-Familiar", "Desayuno", "Almuerzo", "Cena"])
    .withMessage("Categoría no válida"),

  body("price")
    .notEmpty().withMessage("El precio es obligatorio")
    .isFloat({ min: 0 }).withMessage("El precio no puede ser negativo"),

  body("description")
    .optional()
    .isString().withMessage("La descripción debe ser texto"),

  checkValidators,
];

// UPDATE
export const validateUpdateMenu = [
  param("id").isMongoId().withMessage("ID inválido"),

  body("saucerName")
    .optional()
    .notEmpty().withMessage("El nombre no puede estar vacío")
    .isLength({ max: 255 }),

  body("categoryType")
    .optional()
    .isIn(["Platillo-Familiar", "Desayuno", "Almuerzo", "Cena"])
    .withMessage("Categoría no válida"),

  body("price")
    .optional()
    .isFloat({ min: 0 }).withMessage("El precio no puede ser negativo"),

  body("description")
    .optional()
    .isString().withMessage("La descripción debe ser texto"),

  checkValidators,
];

// STATUS
export const validateMenuStatusChange = [
  param("id").isMongoId().withMessage("ID inválido"),
  checkValidators,
];

// GET BY ID
export const validateGetMenuById = [
  param("id").isMongoId().withMessage("ID inválido"),
  checkValidators,
];