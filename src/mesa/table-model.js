'use strict';

import mongoose from 'mongoose';

const mesaSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción de la mesa es obligatoria'],
        trim: true
    },
    numeroMesa: {
        type: Number,
        required: [true, 'El número de mesa es obligatorio'],
        unique: true, // Para que no haya dos mesas con el mismo número
        min: [1, 'El número de mesa debe ser al menos 1']
    },
    capacidad: {
        type: Number,
        required: [true, 'La capacidad de personas es obligatoria'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} debe ser un número entero'
        },
        min: [1, 'La capacidad mínima debe ser de 1 persona']
    },
    estado: {
        type: String,
        required: [true, 'El estado de la mesa es obligatorio'],
        // Solo permite estos tres estados específicos
        enum: {
            values: ['Disponible', 'Ocupada', 'Reservada'],
            message: '{VALUE} no es un estado válido. Usa: Disponible, Ocupada o Reservada'
        },
        default: 'Disponible'
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

// Índices para que sea rápido buscar mesas por número o por estado
mesaSchema.index({ estado: 1 });

// Exportamos el modelo con el nombre 'Mesa'
export default mongoose.model('Mesa', mesaSchema);