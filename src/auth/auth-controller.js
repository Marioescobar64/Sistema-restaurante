import jwt from 'jsonwebtoken';
import { DEMO_USERS, getRolePermissions, hashPassword, verifyPassword } from './auth-utils.js';

const getUserByEmail = (email) => DEMO_USERS.find((user) => user.email.toLowerCase() === String(email).toLowerCase());

export const login = async (req, res) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'papaluigi-dev-secret';
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Correo y contraseña son obligatorios',
      });
    }

    const user = getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash || hashPassword(user.password));

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    const permissions = getRolePermissions(user.role);
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: permissions.role,
        modules: permissions.modules,
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: permissions.role,
          roleLabel: permissions.label,
        },
        token,
        permissions,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message,
    });
  }
};

export const me = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};
