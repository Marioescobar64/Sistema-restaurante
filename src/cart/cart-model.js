'use strict';

import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: [true, 'El pedido es obligatorio']
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
                required: [true, 'El platillo es obligatorio']
            },
            quantity: {
                type: Number,
                required: [true, 'La cantidad es obligatoria'],
                min: [1, 'La cantidad mínima es 1']
            },
            price: {
                type: Number,
                required: [true, 'El precio es obligatorio'],
                min: [0, 'El precio no puede ser negativo']
            },
            subtotal: {
                type: Number,
                required: [true, 'El subtotal es obligatorio'],
                min: [0, 'El subtotal no puede ser negativo']
            }
        }
    ],
    total: {
        type: Number,
        default: 0,
        min: [0, 'El total no puede ser negativo']
    },
    status: {
        type: String,
        enum: {
            values: ['activo', 'confirmado', 'cancelado'],
            message: '{VALUE} no es un estado válido'
        },
        default: 'activo'
    }
}, {
    timestamps: true
});

carritoSchema.index({ orderId: 1 });
carritoSchema.index({ status: 1 });

export default mongoose.model('Cart', carritoSchema);