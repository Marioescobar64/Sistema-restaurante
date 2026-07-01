import jwt from 'jsonwebtoken';

/**
 * Middleware para verificar si el usuario tiene uno de los roles permitidos.
 * Asume que el middleware `authenticate` (que decodifica el token) se ejecutó antes,
 * por lo que `req.user` ya contiene la información del token, incluyendo el rol.
 * 
 * @param  {...string} roles - Lista de roles permitidos (ej. 'SUPER_ADMIN_ROLE', 'GERENTE_ROLE')
 */
export const checkRole = (...roles) => {
    return (req, res, next) => {
        // Verificamos que exista req.user (inyectado por auth-middleware)
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'No autenticado. Token no provisto o inválido.'
            });
        }

        // Verificamos si el rol del usuario está dentro de los permitidos
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(', ')}`
            });
        }

        // Si el usuario tiene el rol permitido, continuamos con el siguiente middleware o controlador
        next();
    };
};
