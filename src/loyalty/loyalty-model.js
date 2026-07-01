import mongoose from 'mongoose';

// Modelo para configurar cuántos puntos se otorgan por compra
const loyaltyConfigSchema = new mongoose.Schema({
    puntosPorDolar: {
        type: Number,
        required: [true, 'Debe especificar cuántos puntos equivale a una unidad de moneda (ej. dólar/peso)'],
        default: 1, // Por defecto 1 punto por cada $1
        min: [0.1, 'Los puntos no pueden ser cero o negativos']
    },
    // Este campo permite tener una única configuración global
    isGlobal: {
        type: Boolean,
        default: true,
        unique: true
    }
}, {
    timestamps: true
});

export const LoyaltyConfig = mongoose.model('LoyaltyConfig', loyaltyConfigSchema);

// Modelo para el historial de puntos de los clientes
const pointHistorySchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El cliente es obligatorio']
    },
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        // Es opcional porque tal vez se le den puntos manualmente por algún reclamo
    },
    puntosOtorgados: {
        type: Number,
        required: [true, 'La cantidad de puntos es obligatoria']
    },
    motivo: {
        type: String,
        required: [true, 'El motivo de los puntos es obligatorio'],
        default: 'Compra en restaurante'
    }
}, {
    timestamps: true
});

export const PointHistory = mongoose.model('PointHistory', pointHistorySchema);
