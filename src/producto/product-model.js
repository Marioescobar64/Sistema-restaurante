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
        required: [true, 'La descripción del producto es obligatoria'],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        // Aseguramos que el precio no sea un número negativo
        min: [0, 'El precio no puede ser menor a 0'] 
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        trim: true
    },
    // Siempre es buena idea agregar un campo para saber si el producto está disponible o no
    isActive: { 
        type: Boolean,
        default: true
    }
}, {
    // Agrega la fecha en que se creó y la última vez que se modificó
    timestamps: true 
});

// Ayuda a que las búsquedas por categoría, nombre o disponibilidad sean más rápidas
productoSchema.index({ categoria: 1 });
productoSchema.index({ nombre: 1 });
productoSchema.index({ isActive: 1 });

// Exportamos el modelo con el nombre 'Producto'
export default mongoose.model('Producto', productoSchema);