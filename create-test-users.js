import { hashPassword } from './src/auth/auth-utils.js';
import User from './src/user/user-model.js';
import mongoose from 'mongoose';

const createTestUser = async () => {
    try {
        // Conectar a la base de datos correcta (SISTEMA-RESTAURANTE)
        const mongoUrl = 'mongodb://localhost:27017/SISTEMA-RESTAURANTE';
        
        await mongoose.connect(mongoUrl);
        console.log('Conectado a MongoDB en SISTEMA-RESTAURANTE');

        // Hash the password using the same function as the app
        const hashedPassword = hashPassword('Gerente123!');

        // Create test user
        const user = new User({
            nombre: 'Gerente Demo',
            email: 'gerente@papaluigi.com',
            password: hashedPassword,
            rol: 'GERENTE_ROLE',
            isActive: true
        });

        await user.save();
        console.log('Usuario gerente creado:', user._id);

        // Create chef user
        const chef = new User({
            nombre: 'Chef Demo',
            email: 'chef@papaluigi.com',
            password: hashPassword('Chef123!'),
            rol: 'CHEF_ROLE',
            isActive: true
        });

        await chef.save();
        console.log('Usuario chef creado:', chef._id);

        // Create mesero user
        const mesero = new User({
            nombre: 'Mesero Demo',
            email: 'mesero@papaluigi.com',
            password: hashPassword('Mesero123!'),
            rol: 'MESERO_ROLE',
            isActive: true
        });

        await mesero.save();
        console.log('Usuario mesero creado:', mesero._id);

        await mongoose.disconnect();
        console.log('Usuarios de prueba creados exitosamente');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

createTestUser();
