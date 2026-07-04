import User from '../user/user-model.js';
import { hashPassword } from '../auth/auth-utils.js';

const seedSuperAdmin = async () => {
    try {
        console.log('Buscando SUPER_ADMIN existente...');

        const existingAdmin = await User.findOne({
            rol: 'SUPER_ADMIN_ROLE'
        });

        if (existingAdmin) {
            console.log(`Ya existe un SUPER_ADMIN: ${existingAdmin.email}`);
            return;
        }

        console.log('Creando SUPER_ADMIN...');

        const superAdmin = new User({
            nombre: 'Super Administrador',
            email: 'admin@papaluigi.com',
            password: hashPassword('Admin123!'),
            rol: 'SUPER_ADMIN_ROLE',
            isActive: true
        });

        await superAdmin.save();

        console.log('SUPER_ADMIN creado correctamente');
    } catch (error) {
        console.error(error);
    }
};

export default seedSuperAdmin;