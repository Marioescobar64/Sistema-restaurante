'use strict';

import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: false,
        trim: true,
        default: 'Cliente'
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: false,
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
                required: [true, 'El platillo es obligatorio'],
                alias: 'producto'
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
                min: [0, 'El subtotal no puede ser negativo'],
                default: 0
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
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

function calculateCartTotals(items) {
    if (!Array.isArray(items)) return 0;
    return items.reduce((total, item) => {
        const quantity = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;
        const subtotal = quantity * price;
        item.subtotal = subtotal;
        return total + subtotal;
    }, 0);
}

carritoSchema.pre('validate', function() {
    if (Array.isArray(this.items) && this.items.length) {
        this.total = calculateCartTotals(this.items);
    } else {
        this.total = 0;
    }
});

carritoSchema.pre('findOneAndUpdate', function() {
    const update = this.getUpdate();
    if (!update) return;
    const set = update.$set || update;
    if (Array.isArray(set.items)) {
        set.total = calculateCartTotals(set.items);
    }
    if (update.$set) {
        update.$set = set;
    } else {
        this.setUpdate(set);
    }
});

carritoSchema.index({ orderId: 1 });
carritoSchema.index({ status: 1 });

export default mongoose.model('Cart', carritoSchema);