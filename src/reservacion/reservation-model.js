'use strict';

import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
    
        eventoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'El evento es obligatorio']
    },

    descripcion: {
        type: String,
        required: [true, 'La descripción de la reserva es obligatoria'],
        trim: true
    },
    usuario: {
        type: String,
        required: [true, 'El nombre del usuario o cliente es obligatorio'],
        trim: true
    },
    mesa: {
        type: Number, // Guardamos el número de la mesa asignada
        required: [true, 'El número de mesa es obligatorio']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha de la reserva es obligatoria']
    },
    hora: {
        type: String, // Ejemplo: "19:30"
        required: [true, 'La hora de la reserva es obligatoria']
    },
    cantidadPersonas: {
        type: Number,
        required: [true, 'La cantidad de personas es obligatoria'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} debe ser un número entero'
        },
        min: [1, 'Debe haber al menos 1 persona para la reserva']
    },
    estado: {
        type: String,
        required: [true, 'El estado de la reserva es obligatorio'],
        enum: {
            values: ['Activa', 'Cancelada', 'Finalizada'],
            message: '{VALUE} no es un estado válido. Usa: Activa, Cancelada o Finalizada'
        },
        default: 'Activa'
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

// Índices para que el sistema encuentre rápido las reservas por fecha o estado
reservaSchema.index({ fecha: 1 });
reservaSchema.index({ estado: 1 });
reservaSchema.index({ usuario: 1 });

// Exportamos el modelo
export default mongoose.model('Reserva', reservaSchema);