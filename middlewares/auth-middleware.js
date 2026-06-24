import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'papaluigi-dev-secret';
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

  let userModules = req.user.modules || [];
  if (typeof userModules === 'string') {
    userModules = userModules.split(',').map(m => m.trim());
  }
  const hasAccess = allowedModules.every((moduleName) => userModules.includes(moduleName));

  if (!hasAccess) {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos para acceder a este recurso',
    });
  }

  next();
};
