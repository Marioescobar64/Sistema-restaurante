'use strict';

import mongoose, { mongo } from 'mongoose';

const administrationSchema = new mongoose.Schema({
        restaurantdName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'El nombre del restaurante no puede ser mas de 100 caracteres'],
    },
    categoryType: {
        type: String,
        required: [true, 'El tipo de campo es requerido'],
        enum: {
            values: ['Familiar, Romantico, general'],
            message: 'Tipo de superficie no valida',
        },
    },
    // es la capacidad de personas sin incluir al personal en el restaurante
    capacity: {
        type: String,
        required: [true, 'La capacidad es requerida'],
        enum: {
        message: 'Capacidad no válida',
        },
    },   
     
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
administrationSchema.index({ restaurantdName: 1  });
administrationSchema.index({ restaurantdName: 1, isActive: 1  });



// exportamos el modelo con el nombre Field
export default mongoose.model('Administration', administrationSchema)
