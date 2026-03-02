'use strict';

import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    nombrePedido: {
        type: String,
        required: [true, 'El nombre del pedido es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre del pedido no puede ser tan largo']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del pedido es obligatoria'],
        trim: true
    },
    fechaPedido: {
        type: Date,
        // Si no le mandas fecha, tomará el momento exacto en el que se crea
        default: Date.now,
        required: [true, 'La fecha del pedido es obligatoria']
    },
    total: {
        type: Number,
        required: [true, 'El total a pagar es obligatorio'],
        min: [0, 'El total no puede ser negativo']
    },
    estado: {
        type: String,
        required: [true, 'El estado del pedido es obligatorio'],
        // Usamos enum otra vez para obligar a que solo se usen estas 4 opciones
        enum: {
            values: ['Pendiente', 'En proceso', 'Entregado', 'Cancelado'],
            message: '{VALUE} no es un estado válido. Usa: Pendiente, En proceso, Entregado o Cancelado'
        },
        // Lo más normal es que un pedido nuevo empiece como 'Pendiente'
        default: 'Pendiente'
    },
    editable: {
        type: Boolean,
        default: true // Asumo que al inicio se puede editar
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true 
});

// Índices para que buscar pedidos por estado o fecha sea rápido
pedidoSchema.index({ estado: 1 });
pedidoSchema.index({ fechaPedido: 1 });

// Exportamos el modelo con el nombre 'Pedido'
export default mongoose.model('Pedido', pedidoSchema);