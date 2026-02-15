'use strict';

import mongoose, { mongo } from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: [true, 'El número de mesa es requerido'],
        unique: true,
    },

    capacity: {
        type: Number,
        required: [true, 'La capacidad es requerida'],
        min: [1, 'La capacidad debe ser mayor a 0'],
    },

    location: {
        type: String,
        required: [true, 'La ubicación es requerida'],
        enum: {
            values: ['Salón Principal', 'Terraza', 'Área VIP', 'Jardín', 'Interior'],
            message: 'Ubicación no válida',
        }
    },

    status: {
        type: String,
        enum: {
            values: ['Disponible', 'Ocupada', 'Reservada', 'Mantenimiento'],
            message: 'Estado no válido',
        },
        default: 'Disponible'
    },
     
    photo: {
    type: String,
    // valor por defecto
    default: 'administration/maintenance',
    },
    

    isActive: {
    type: Boolean,
    default: true,
    }
});

maintenanceSchema.index({ isActive: 1  });
maintenanceSchema.index({ status: 1  });
maintenanceSchema.index({ status: 1, isActive: 1  });



// exportamos el modelo con el nombre Field
export default mongoose.model('Maintenance', maintenanceSchema)
