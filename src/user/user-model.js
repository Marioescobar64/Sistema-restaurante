'use strict';

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del usuario es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true, // Evita correos duplicados
        trim: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor ingresa un correo electrónico válido'
        ]
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: [true, 'El rol del usuario es obligatorio'],
        // Enum: restringe los valores a los definidos en esta lista.
        // SUPER_ADMIN_ROLE: control total
        // GERENTE_ROLE: administra restaurante (empleados, config, etc)
        // CHEF_ROLE: cocina
        // MESERO_ROLE: atención al cliente (órdenes, mesas)
        // USER_ROLE: cliente de la app móvil
        enum: {
            values: ['SUPER_ADMIN_ROLE', 'GERENTE_ROLE', 'CHEF_ROLE', 'MESERO_ROLE', 'USER_ROLE'],
            message: '{VALUE} no es un rol válido'
        },
        default: 'USER_ROLE'
    },
    puntosAcumulados: {
        type: Number,
        default: 0,
        min: [0, 'Los puntos no pueden ser negativos']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Índice para agilizar la búsqueda por correo, ya que será usado frecuentemente en el login
userSchema.index({ email: 1 });

export default mongoose.model('User', userSchema);
