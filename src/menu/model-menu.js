'use strict';

import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    saucerName: {
        type: String,
        required: [true, 'El nombre del platillo es obligatorio'],
        trim: true,
        maxLength: [255, 'El nombre del platillo no puede exceder los 255 caracteres'],
    },
    categoryType: {
        type: String,
        required: [true, 'La categoría es requerida'],
        enum: {
            values: ['Platillo-Familiar', 'Desayuno', 'Almuerzo', 'Cena'],
            message: '{VALUE} no es una categoría válida',
        },
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'La descripción no puede exceder 500 caracteres'],
    },
    photo: {
        type: String,
        default: 'administration/saucer',
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

menuSchema.index({ isActive: 1 });
menuSchema.index({ saucerName: 1 });
menuSchema.index({ saucerName: 1, isActive: 1 });

export default mongoose.model('Menu', menuSchema);