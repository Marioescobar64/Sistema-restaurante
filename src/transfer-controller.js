import Transferencia from './transfer-model.js';

// Obtener todas las transferencias con paginación y filtros
export const getTransferencias = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true, fullName } = req.query;

    const filter = {};

    // Filtro por estado
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    // Filtro por nombre (búsqueda parcial)
    if (fullName) {
      filter.fullName = { $regex: fullName, $options: 'i' };
    }

    const transferencias = await Transferencia.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Transferencia.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: transferencias,
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
      message: 'Error al obtener las transferencias',
      error: error.message,
    });
  }
};

// Obtener transferencia por ID
export const getTransferenciaById = async (req, res) => {
  try {
    const { id } = req.params;

    const transferencia = await Transferencia.findById(id);

    if (!transferencia) {
      return res.status(404).json({
        success: false,
        message: 'Transferencia no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: transferencia,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la transferencia',
      error: error.message,
    });
  }
};

// Crear nueva transferencia
export const createTransferencia = async (req, res) => {
  try {
    const transferenciaData = req.body;

    const transferencia = new Transferencia(transferenciaData);
    await transferencia.save();

    res.status(201).json({
      success: true,
      message: 'Transferencia creada exitosamente',
      data: transferencia,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la transferencia',
      error: error.message,
    });
  }
};

// Actualizar transferencia
export const updateTransferencia = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const transferencia = await Transferencia.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transferencia) {
      return res.status(404).json({
        success: false,
        message: 'Transferencia no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transferencia actualizada exitosamente',
      data: transferencia,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la transferencia',
      error: error.message,
    });
  }
};

// Activar / Desactivar transferencia (Soft Delete)
export const changeTransferenciaStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activada' : 'desactivada';

    const transferencia = await Transferencia.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!transferencia) {
      return res.status(404).json({
        success: false,
        message: 'Transferencia no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: `Transferencia ${action} exitosamente`,
      data: transferencia,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado de la transferencia',
      error: error.message,
    });
  }
};