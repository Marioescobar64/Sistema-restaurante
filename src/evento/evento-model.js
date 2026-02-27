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
    fecha: {
        type: Date,
        required: [true, 'La fecha del evento es obligatoria']
    },
    horaInicio: {
        type: String, // Ejemplo: "09:00 AM" o "14:00"
        required: [true, 'La hora de inicio es obligatoria']
    },
    horaFin: {
        type: String, // Ejemplo: "11:00 AM" o "16:00"
        required: [true, 'La hora de finalización es obligatoria']
    },
    observaciones: {
        type: String,
        trim: true,
        default: 'Sin observaciones'
    },
    // Mantengo el isActive por buena práctica de borrado lógico
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Índices para búsquedas rápidas por nombre y fecha
eventoSchema.index({ nombreEvento: 1 });
eventoSchema.index({ fecha: 1 });
eventoSchema.index({ isActive: 1 });

// Exportamos el modelo con el nombre 'Evento'
export default mongoose.model('Evento', eventoSchema);