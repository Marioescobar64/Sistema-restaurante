import jwt from 'jsonwebtoken';
import { hashPassword, verifyPassword } from './auth-utils.js';
import User from '../user/user-model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'papaluigi-dev-secret';

// Registro exclusivo para clientes (USER_ROLE)
export const register = async (req, res) => {
    try {
        const { nombre, email, password, phone, surname, username } = req.body;

        if (!nombre || !email || !password || !phone || !surname || !username) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, correo, telefono y contraseña son obligatorios'
            });
        }

        // Verificar si el correo ya existe
        const existingUser = await User.findOne({ email: String(email).toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'El correo ya está registrado'
            });
        }

        // Hashear la contraseña usando la utilidad existente
        const hashedPassword = hashPassword(password);

        // Crear el usuario obligatoriamente como USER_ROLE
        const newUser = new User({
            nombre,
            email: String(email).toLowerCase(),
            password: hashedPassword,
            rol: 'USER_ROLE'
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'Cliente registrado exitosamente',
            data: {
                id: newUser._id,
                nombre: newUser.nombre,
                email: newUser.email,
                rol: newUser.rol
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// Login para cualquier rol
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Correo y contraseña son obligatorios'
            });
        }

        // Buscar al usuario en la base de datos
        const user = await User.findOne({ email: String(email).toLowerCase() });

        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas o cuenta inactiva'
            });
        }

        // Verificar la contraseña
        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Generar el token
        const token = jwt.sign(
            {
                sub: user._id,
                email: user.email,
                nombre: user.nombre,
                role: user.rol // Importante: incluir el rol en el token para el middleware
            },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login exitoso',
            data: {
                user: {
                    id: user._id,
                    nombre: user.nombre,
                    email: user.email,
                    rol: user.rol,
                    puntos: user.puntosAcumulados
                },
                token
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

// Registro de empleados (Solo para SUPER_ADMIN_ROLE y GERENTE_ROLE)
export const registerEmployee = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        if (!nombre || !email || !password || !rol) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, correo, contraseña y rol son obligatorios'
            });
        }

        // Roles permitidos para empleados
        const allowedRoles = ['GERENTE_ROLE', 'CHEF_ROLE', 'MESERO_ROLE'];

        if (!allowedRoles.includes(rol)) {
            return res.status(400).json({
                success: false,
                message: `Rol no válido para empleados. Solo se permite: ${allowedRoles.join(', ')}`
            });
        }

        // Validar si el que intenta crear el empleado es GERENTE_ROLE y quiere crear un GERENTE_ROLE (regla de negocio: SUPER_ADMIN puede crear GERENTE_ROLE, el GERENTE puede crear CHEF y MESERO)
        // En este caso, el requerimiento dice: "SUPER_ADMIN y el GERENTE puedan registrar empleados (GERENTE_ROLE, CHEF_ROLE y MESERO_ROLE)."
        // Lo dejamos libre para ambos, tal como dice el requerimiento.

        const existingUser = await User.findOne({ email: String(email).toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'El correo ya está registrado'
            });
        }

        const hashedPassword = hashPassword(password);

        const newUser = new User({
            nombre,
            email: String(email).toLowerCase(),
            password: hashedPassword,
            rol
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: `Empleado registrado exitosamente con el rol ${rol}`,
            data: {
                id: newUser._id,
                nombre: newUser.nombre,
                email: newUser.email,
                rol: newUser.rol
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al registrar empleado',
            error: error.message
        });
    }
};

export const me = async (req, res) => {
    // Al utilizar el token, podríamos devolver datos frescos de la BD para tener los puntos actualizados
    try {
        const user = await User.findById(req.user.sub).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
};
