import { Router } from 'express';
import { login, me, register, registerEmployee } from './auth-controller.js';
import { authenticate } from '../../middlewares/auth-middleware.js';
import { checkRole } from '../../middlewares/role-middleware.js';
import User from '../user/user-model.js';
import { verifyPassword } from './auth-utils.js';

const router = Router();

// Rutas Públicas
router.post('/login', login);

// Ruta para registrar clientes (solo USER_ROLE)
router.post('/register', register);

// DEBUG ENDPOINTS (borrar en producción)
router.get('/debug/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/debug/verify-password', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: String(email).toLowerCase() });
        
        if (!user) {
            return res.json({ found: false, message: 'Usuario no encontrado' });
        }

        const isValid = await verifyPassword(password, user.password);
        res.json({ 
            found: true,
            email: user.email,
            isActive: user.isActive,
            passwordMatch: isValid,
            storedHash: user.password.substring(0, 20) + '...'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rutas Protegidas
router.use(authenticate);

// Obtener perfil actual
router.get('/me', me);

// Registrar empleados (Solo SUPER_ADMIN_ROLE y GERENTE_ROLE)
router.post('/register-employee', checkRole('SUPER_ADMIN_ROLE', 'GERENTE_ROLE'), registerEmployee);

export default router;
