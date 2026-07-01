import { Router } from 'express';
import { login, me, register, registerEmployee } from './auth-controller.js';
import { authenticate } from '../../middlewares/auth-middleware.js';
import { checkRole } from '../../middlewares/role-middleware.js';

const router = Router();

// Rutas Públicas
router.post('/login', login);

// Ruta para registrar clientes (solo USER_ROLE)
router.post('/register', register);

// Rutas Protegidas
router.use(authenticate);

// Obtener perfil actual
router.get('/me', me);

// Registrar empleados (Solo SUPER_ADMIN_ROLE y GERENTE_ROLE)
router.post('/register-employee', checkRole('SUPER_ADMIN_ROLE', 'GERENTE_ROLE'), registerEmployee);

export default router;
