import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'papaluigi-dev-secret';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token no proporcionado',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
      error: error.message,
    });
  }
};

export const authorize = (allowedModules = []) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'No autenticado',
    });
  }

  const userModules = req.user.modules || [];
  const hasAccess = allowedModules.every((moduleName) => userModules.includes(moduleName));

  if (!hasAccess) {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos para acceder a este recurso',
    });
  }

  next();
};
