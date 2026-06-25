import Branch from './model-branch.js';
import Administration from '../administration/model-administration.js';

export const getBranches = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive: isActive === 'true' || isActive === true };

        const branches = await Branch.find(filter)
            .populate('assignedStaff')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ name: 1 });

        const total = await Branch.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: branches,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: Number(limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las sucursales',
            error: error.message,
        });
    }
};

export const getBranchById = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await Branch.findById(id).populate('assignedStaff');

        if (!branch) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        res.status(200).json({ success: true, data: branch });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la sucursal', error: error.message });
    }
};

export const createBranch = async (req, res) => {
    try {
        const branchData = req.body;
        const branch = new Branch(branchData);
        await branch.save();

        res.status(201).json({
            success: true,
            message: 'Sucursal creada exitosamente',
            data: branch,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la sucursal',
            error: error.message,
        });
    }
};

export const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await Branch.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate('assignedStaff');

        if (!branch) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        res.status(200).json({
            success: true,
            message: 'Sucursal actualizada exitosamente',
            data: branch,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la sucursal',
            error: error.message,
        });
    }
};

export const changeBranchStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activate');
        const action = isActive ? 'activada' : 'desactivada';

        const branch = await Branch.findByIdAndUpdate(id, { isActive }, { new: true }).populate('assignedStaff');

        if (!branch) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        res.status(200).json({
            success: true,
            message: `Sucursal ${action} exitosamente`,
            data: branch,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado de la sucursal',
            error: error.message,
        });
    }
};

export const assignStaffToBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const { staffId } = req.body; // El ID de Administracion

        const adminDoc = await Administration.findById(staffId);
        if (!adminDoc) {
            return res.status(404).json({ success: false, message: 'Staff (Administración) no encontrado en BD' });
        }

        const branch = await Branch.findByIdAndUpdate(
            id,
            { $addToSet: { assignedStaff: staffId } },
            { new: true }
        ).populate('assignedStaff');

        if (!branch) {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        res.status(200).json({
            success: true,
            message: 'Staff asignado exitosamente',
            data: branch
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al asignar staff',
            error: error.message
        });
    }
};
