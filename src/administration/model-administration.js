'use strict';

import mongoose from 'mongoose';

const administrationSchema = new mongoose.Schema({
        restaurantName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del restaurante no puede ser mas de 100 caracteres'],
    },
    categoryType: {
        type: String,
        required: [true, 'El tipo de categoria es requerido'],
        enum: {
            values: ['FAMILIAR', 'ROMANTICO', 'GENERAL'],
            message: 'Tipo de categoría no válida',
        },
    },
    // es la capacidad de personas sin incluir al personal en el restaurante
    capacity: {
        type: Number,
        required: [true, 'La capacidad es requerida'],
        min: [1, 'La capacidad debe ser mayor a 0'],
    },
    administrators: [
        {
            nombre: {
                type: String,
                required: [true, 'El nombre del usuario administrativo es obligatorio'],
                trim: true,
                maxLength: [80, 'El nombre no puede exceder los 80 caracteres']
            },
            apellido: {
                type: String,
                required: [true, 'El apellido del usuario administrativo es obligatorio'],
                trim: true,
                maxLength: [80, 'El apellido no puede exceder los 80 caracteres']
            },
            cargo: {
                type: String,
                required: [true, 'El cargo del usuario administrativo es obligatorio'],
                trim: true,
                maxLength: [80, 'El cargo no puede exceder los 80 caracteres']
            },
            rol: {
                type: String,
                required: [true, 'El rol del usuario administrativo es obligatorio'],
                trim: true,
                maxLength: [80, 'El rol no puede exceder los 80 caracteres']
            }
        }
    ],
    photo: {
    type: String,
    // valor por defecto
    default: 'administration/restaurant',
    },
    

    isActive: {
    type: Boolean,
    default: true,
    }
});

administrationSchema.index({ isActive: 1  });
administrationSchema.index({ restaurantName: 1  });
administrationSchema.index({ restaurantName: 1, isActive: 1  });



// exportamos el modelo con el nombre Field
export default mongoose.model('Administration', administrationSchema)
