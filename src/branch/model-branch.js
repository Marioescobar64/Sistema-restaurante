import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la sucursal es requerido'],
        trim: true,
        maxLength: [100, 'El nombre no puede exceder los 100 caracteres'],
    },
    branchType: {
        type: String,
        required: [true, 'El tipo de sucursal es requerido'],
        enum: {
            values: ['Restaurante', 'Bar', 'Cafetería', 'General'],
            message: 'Tipo de sucursal no válido',
        },
        default: 'Restaurante'
    },
    assignedStaff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Administration'
    }],
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

branchSchema.index({ isActive: 1 });
branchSchema.index({ name: 1 });

export default mongoose.model('Branch', branchSchema);
