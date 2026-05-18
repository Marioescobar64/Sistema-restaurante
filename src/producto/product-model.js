'use strict';

import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre no puede tener más de 100 caracteres']
    },
    descripcion: {
        type: String,
        required: false, // <-- Cambiado a false para que no bloquee si no lo usas en el modal
        trim: true
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad mínima es obligatoria'],
        min: [0, 'La cantidad no puede ser menor a 0']
    },
    cantidadObtenida: {
        type: Number,
        required: [true, 'La cantidad obtenida es obligatoria'],
        min: [0, 'La cantidad obtenida no puede ser menor a 0']
    },
    fechaExp: {
        type: Date,
        required: [true, 'La fecha de expiración es obligatoria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser menor a 0'] 
    },
    categoria: {
        type: String,
        required: false, // <-- Cambiado a false temporalmente por si no lo envías
        trim: true
    },
    isActive: { 
        type: Boolean,
        default: true
    }
}, {
    timestamps: true 
});

// Índices para búsquedas rápidas
productoSchema.index({ categoria: 1 });
productoSchema.index({ nombre: 1 });
productoSchema.index({ isActive: 1 });

export default mongoose.model('Producto', productoSchema);