'use strict';

import mongoose from 'mongoose';

const detallePedidoSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
        // Validamos que sea un número entero
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} no es un número entero'
        },
        min: [1, 'La cantidad debe ser al menos 1']
    },
    precioUnitario: {
        type: Number,
        required: [true, 'El precio unitario es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    subtotal: {
        type: Number,
        required: [true, 'El subtotal es obligatorio'],
        min: [0, 'El subtotal no puede ser negativo']
    },
    editable: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Índices para mejorar el rendimiento de las búsquedas
detallePedidoSchema.index({ descripcion: 1 });

// Exportamos el modelo
export default mongoose.model('DetallePedido', detallePedidoSchema);