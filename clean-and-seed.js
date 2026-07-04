import { hashPassword } from './src/auth/auth-utils.js';
import User from './src/user/user-model.js';
import BranchModel from './src/branch/model-branch.js';
import mongoose from 'mongoose';

const cleanAndCreateData = async () => {
    try {
        const mongoUrl = process.env.URI_MONGODB || 'mongodb://localhost:27017/papaluigi';

        await mongoose.connect(mongoUrl);
        console.log(`✅ Conectado a MongoDB en ${new URL(mongoUrl).pathname.replace('/', '')}`);

        await BranchModel.deleteMany({});
        console.log('🗑️  Sucursales eliminadas');

        await User.deleteMany({ rol: { $ne: 'SUPER_ADMIN_ROLE' } });
        console.log('🗑️  Usuarios no administrativos eliminados');

        const admin = await User.findOneAndUpdate(
            { email: 'admin@papaluigi.com' },
            {
                nombre: 'Super Administrador',
                password: hashPassword('Admin123!'),
                rol: 'SUPER_ADMIN_ROLE',
                isActive: true,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        const gerente = await User.create({
            nombre: 'Juan García',
            email: 'juan.garcia@papaluigi.com',
            password: hashPassword('Password123!'),
            rol: 'GERENTE_ROLE',
            isActive: true
        });

        const chef1 = await User.create({
            nombre: 'Carlos López',
            email: 'carlos.lopez@papaluigi.com',
            password: hashPassword('Password123!'),
            rol: 'CHEF_ROLE',
            isActive: true
        });

        const chef2 = await User.create({
            nombre: 'Miguel Rodríguez',
            email: 'miguel.rodriguez@papaluigi.com',
            password: hashPassword('Password123!'),
            rol: 'CHEF_ROLE',
            isActive: true
        });

        const mesero1 = await User.create({
            nombre: 'Ana Martínez',
            email: 'ana.martinez@papaluigi.com',
            password: hashPassword('Password123!'),
            rol: 'MESERO_ROLE',
            isActive: true
        });

        const mesero2 = await User.create({
            nombre: 'Sofia Pérez',
            email: 'sofia.perez@papaluigi.com',
            password: hashPassword('Password123!'),
            rol: 'MESERO_ROLE',
            isActive: true
        });

        const mesero3 = await User.create({
            nombre: 'Marco González',
            email: 'marco.gonzalez@papaluigi.com',
            password: hashPassword('Password123!'),
            rol: 'MESERO_ROLE',
            isActive: true
        });

        console.log('✅ Usuarios creados:');
        console.log(`  - Admin: ${admin.email} / Admin123!`);
        console.log('  - Gerente: juan.garcia@papaluigi.com / Password123!');
        console.log('  - Chef 1: carlos.lopez@papaluigi.com / Password123!');
        console.log('  - Chef 2: miguel.rodriguez@papaluigi.com / Password123!');
        console.log('  - Mesero 1: ana.martinez@papaluigi.com / Password123!');
        console.log('  - Mesero 2: sofia.perez@papaluigi.com / Password123!');
        console.log('  - Mesero 3: marco.gonzalez@papaluigi.com / Password123!');

        const branch = await BranchModel.create({
            name: 'Sucursal Centro',
            branchType: 'Restaurante',
            assignedStaff: [
                {
                    user: gerente._id,
                    role: 'GERENTE_ROLE',
                    assignedAt: new Date()
                },
                {
                    user: chef1._id,
                    role: 'CHEF_ROLE',
                    assignedAt: new Date()
                },
                {
                    user: mesero1._id,
                    role: 'MESERO_ROLE',
                    assignedAt: new Date()
                }
            ],
            isActive: true
        });

        console.log(`✅ Sucursal creada: ${branch.name}`);

        await mongoose.disconnect();
        console.log('✅ Base de datos lista para pruebas');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

cleanAndCreateData();
