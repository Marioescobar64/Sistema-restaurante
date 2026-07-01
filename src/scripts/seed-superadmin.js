import mongoose from 'mongoose';
import 'dotenv/config'; // Para cargar las variables de entorno
import User from '../user/user-model.js';
import { hashPassword } from '../auth/auth-utils.js';

const seedSuperAdmin = async () => {
    try {
        console.log('Conectando a la base de datos...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gestor-restaurante', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Buscando SUPER_ADMIN existente...');
        const existingAdmin = await User.findOne({ rol: 'SUPER_ADMIN_ROLE' });

        if (existingAdmin) {
            console.log(`Ya existe un SUPER_ADMIN en la base de datos: ${existingAdmin.email}`);
            process.exit(0);
        }

        console.log('Creando usuario SUPER_ADMIN_ROLE...');
        const superAdmin = new User({
            nombre: 'Super Administrador',
            email: 'admin@papaluigi.com',
            password: hashPassword('Admin123!'),
            rol: 'SUPER_ADMIN_ROLE',
            isActive: true
        });

        await superAdmin.save();
        console.log('Super Admin creado exitosamente:');
        console.log(`Email: ${superAdmin.email}`);
        console.log('Password: Admin123!');

    } catch (error) {
        console.error('Error al sembrar el Super Admin:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedSuperAdmin();
