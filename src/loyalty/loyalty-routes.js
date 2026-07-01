import { Router } from 'express';
import { updateConfig, getConfig, getHistory } from './loyalty-controller.js';
import { authenticate } from '../../middlewares/auth-middleware.js';
import { checkRole } from '../../middlewares/role-middleware.js';

const router = Router();

// Todas las rutas de lealtad requieren autenticación
router.use(authenticate);

// Solo GERENTE y SUPER_ADMIN pueden configurar y ver historiales
router.put('/config', checkRole('GERENTE_ROLE', 'SUPER_ADMIN_ROLE'), updateConfig);
router.get('/config', checkRole('GERENTE_ROLE', 'SUPER_ADMIN_ROLE'), getConfig);
router.get('/history', checkRole('GERENTE_ROLE', 'SUPER_ADMIN_ROLE'), getHistory);

export default router;
