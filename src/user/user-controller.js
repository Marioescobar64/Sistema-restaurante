import User from './user-model.js';

export const getUsers = async (req, res) => {
    try {
        const { role, isActive = true } = req.query;
        const filter = { isActive };

        if (role) {
            filter.rol = role;
        }

        const users = await User.find(filter).select('-password').sort({ nombre: 1 });

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios',
            error: error.message,
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el usuario', error: error.message });
    }
};
