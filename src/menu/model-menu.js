'use strict';

import mongoose, { mongo } from 'mongoose';

const menuSchema = new mongoose.Schema({
        saucerName: {
        type: String,
        required: true,
        trim: true,
        maxLength: [255, 'El nombre del platillo no puede tener mas de 100 caracteres'],
    },
    categoryType: {
        type: String,
        required: [true, 'El tipo de campo es requerido'],
        enum: {
            values: ['Platillo-Familiar, Desayuno, Almuerzo, Cena'],
            message: 'Tipo de superficie no valida',
        },
    },
    // es la capacidad de personas sin incluir al personal en el restaurante 

    description: {
    type: String,
    trim: true,
    maxLength: [500, 'La descripción no puede exceder 500 caracteres'],
    },
     
    photo: {
    type: String,
    // valor por defecto
    default: 'administration/saucer',
    },
    

    isActive: {
    type: Boolean,
    default: true,
    }
});

menuSchema.index({ isActive: 1  });
menuSchema.index({ saucerName: 1  });
menuSchema.index({ saucerName: 1, isActive: 1  });

 

// exportamos el modelo con el nombre Field
export default mongoose.model('Administration', menuSchema)
