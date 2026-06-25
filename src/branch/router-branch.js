import { Router } from 'express';
import {
    getBranches,
    getBranchById,
    createBranch,
    updateBranch,
    changeBranchStatus,
    assignStaffToBranch
} from './controller-branch.js';

import {
    validateCreateBranch,
    validateUpdateBranch,
    validateGetBranchById,
    validateAssignStaff
} from '../../middlewares/validation-branch.js';

const router = Router();

// Obtener todas las sucursales
router.get('/', getBranches);

// Obtener sucursal por ID
router.get('/:id', validateGetBranchById, getBranchById);

// Crear sucursal
router.post('/', validateCreateBranch, createBranch);

// Actualizar sucursal
router.put('/:id', validateUpdateBranch, updateBranch);

// Activar sucursal
router.put('/:id/activate', changeBranchStatus);

// Desactivar sucursal
router.put('/:id/deactivate', changeBranchStatus);

// Asignar Staff
router.post('/:id/assign-staff', validateAssignStaff, assignStaffToBranch);

export default router;
