import Branch from './model-branch.js';
import User from '../user/user-model.js';

const allowedBranchStaffRoles = ['GERENTE_ROLE', 'CHEF_ROLE', 'MESERO_ROLE'];

const populateAssignedStaff = async (queryOrDocument) => {
    if (!queryOrDocument || typeof queryOrDocument.populate !== 'function') {
        return queryOrDocument;
    }

    return queryOrDocument.populate({
        path: 'assignedStaff.user',
        select: '-password',
    });
};

export const normalizeStaffIds = (payload = {}) => {
    const rawIds = Array.isArray(payload)
        ? payload
        : [payload?.staffId, ...(Array.isArray(payload?.staffIds) ? payload.staffIds : [])];

    return [...new Set(rawIds.filter(Boolean))];
};

export const assignStaffToBranchService = async ({
    branchId,
    requestedStaffIds,
    role,
    BranchModel = Branch,
    UserModel = User,
}) => {
    const staffIds = Array.isArray(requestedStaffIds)
        ? requestedStaffIds
        : normalizeStaffIds(requestedStaffIds);

    const normalizedRole = String(role || '').toUpperCase();

    if (!staffIds.length) {
        throw new Error('Se requiere al menos un ID de personal para asignar a la sucursal');
    }

    if (!allowedBranchStaffRoles.includes(normalizedRole)) {
        throw new Error(`El rol debe ser uno de: ${allowedBranchStaffRoles.join(', ')}`);
    }

    const existingBranch = await BranchModel.findById(branchId).select('assignedStaff');
    if (!existingBranch) {
        throw new Error('Sucursal no encontrada');
    }

    const alreadyAssignedInBranch = new Set(
        (existingBranch.assignedStaff || []).map((entry) => entry.user?.toString()).filter(Boolean)
    );

    const staffIdsToAssign = staffIds.filter((staffId) => !alreadyAssignedInBranch.has(String(staffId)));

    if (!staffIdsToAssign.length) {
        return populateAssignedStaff(await BranchModel.findById(branchId));
    }

    const staffUsers = await UserModel.find({
        _id: { $in: staffIdsToAssign },
        rol: normalizedRole,
        isActive: true,
    });

    if (staffUsers.length !== staffIdsToAssign.length) {
        throw new Error('No se encontraron usuarios válidos para asignar a la sucursal');
    }

    const conflictingAssignments = await BranchModel.findOne({
        _id: { $ne: branchId },
        'assignedStaff.user': { $in: staffIdsToAssign },
    });

    if (conflictingAssignments) {
        throw new Error('Uno o más usuarios ya están asignados a otra sucursal');
    }

    const assignments = staffIdsToAssign.map((staffId) => ({ user: staffId, role: normalizedRole }));

    const branch = await BranchModel.findByIdAndUpdate(
        branchId,
        { $addToSet: { assignedStaff: { $each: assignments } } },
        { new: true, runValidators: true }
    );

    if (!branch) {
        throw new Error('Sucursal no encontrada');
    }

    return populateAssignedStaff(branch);
};

export const getBranches = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive: isActive === 'true' || isActive === true };

        const branches = await Branch.find(filter)
            .populate({ path: 'assignedStaff.user', select: '-password' })
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
        const branch = await Branch.findById(id).populate({ path: 'assignedStaff.user', select: '-password' });

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
        const branch = await Branch.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate({ path: 'assignedStaff.user', select: '-password' });

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

        const branch = await Branch.findByIdAndUpdate(id, { isActive }, { new: true }).populate({ path: 'assignedStaff.user', select: '-password' });

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
        const requestedStaffIds = normalizeStaffIds(req.body);
        const role = req.body.role;

        const branch = await assignStaffToBranchService({
            branchId: id,
            requestedStaffIds,
            role,
            BranchModel: Branch,
            UserModel: User,
        });

        res.status(200).json({
            success: true,
            message: 'Staff asignado exitosamente',
            data: branch,
        });
    } catch (error) {
        if (error.message === 'Sucursal no encontrada') {
            return res.status(404).json({ success: false, message: 'Sucursal no encontrada' });
        }

        if (error.message.includes('Se requiere al menos un ID') || error.message.includes('No se encontraron usuarios') || error.message.includes('El rol debe ser uno de')) {
            return res.status(400).json({ success: false, message: error.message });
        }

        if (error.message.includes('ya están asignados a otra sucursal')) {
            return res.status(409).json({ success: false, message: error.message });
        }

        res.status(500).json({
            success: false,
            message: 'Error al asignar staff',
            error: error.message,
        });
    }
};
