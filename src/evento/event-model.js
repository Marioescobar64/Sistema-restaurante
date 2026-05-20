'use strict';

import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
    nombreEvento: {
        type: String,
        required: [true, 'El nombre del evento es obligatorio'],
        trim: true,
        maxLength: [150, 'El nombre del evento no puede exceder los 150 caracteres']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del evento es obligatoria'],
        trim: true
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio del evento es obligatoria']
    },
    fechaFin: {
        type: Date,
        required: [true, 'La fecha de finalización del evento es obligatoria']
    },
    horaInicio: {
        type: String,
        required: [true, 'La hora de inicio es obligatoria']
    },
    horaFin: {
        type: String,
        required: [true, 'La hora de finalización es obligatoria']
    },
    estado: {
        type: String,
        required: [true, 'El estado del evento es obligatorio'],
        enum: {
            values: ['Programado', 'En curso', 'Finalizado', 'Cancelado'],
            message: '{VALUE} no es un estado válido. Usa: Programado, En curso, Finalizado o Cancelado'
        },
        default: 'Programado'
    },
    observaciones: {
        type: String,
        trim: true,
        default: 'Sin observaciones'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
// Índices para búsquedas rápidas por nombre y fecha de inicio
eventoSchema.index({ nombreEvento: 1 });
eventoSchema.index({ fechaInicio: 1 });
eventoSchema.index({ isActive: 1 });

// Exportamos el modelo con el nombre 'Evento'
export default mongoose.model('Evento', eventoSchema);