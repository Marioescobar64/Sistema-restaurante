import Maintenance from './model-maintenance.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

// Obtener todas las mesas (paginación + filtros)
export const getMaintenances = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true, status } = req.query;

    const filter = { isActive };

    if (status) {
      filter.status = status;
    }

    const maintenances = await Maintenance.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ tableNumber: 1 });

    const total = await Maintenance.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: maintenances,
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
      message: 'Error al obtener las mesas',
      error: error.message,
    });
  }
};

// Obtener mesa por ID
export const getMaintenanceById = async (req, res) => {
  try {
    const { id } = req.params;

    const maintenance = await Maintenance.findById(id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: 'Mesa no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: maintenance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la mesa',
      error: error.message,
    });
  }
};

// Crear mesa
export const createMaintenance = async (req, res) => {
  try {
    const maintenanceData = req.body;

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;

      const relativePath = filename.includes('maintenance/')
        ? filename.substring(filename.indexOf('maintenance/'))
        : filename;

      maintenanceData.photo = `${relativePath}.${extension}`;
    } else {
      maintenanceData.photo = 'administration/maintenance';
    }

    const maintenance = new Maintenance(maintenanceData);
    await maintenance.save();

    res.status(201).json({
      success: true,
      message: 'Mesa creada exitosamente',
      data: maintenance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear la mesa',
      error: error.message,
    });
  }
};

// Actualizar mesa
export const updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const currentMaintenance = await Maintenance.findById(id);

      // Eliminar imagen anterior de Cloudinary
      if (currentMaintenance && currentMaintenance.photo) {
        const photoPath = currentMaintenance.photo;
        const photoWithoutExt = photoPath.substring(
          0,
          photoPath.lastIndexOf('.')
        );

        try {
          await cloudinary.uploader.destroy(photoWithoutExt);
        } catch (deleteError) {
          console.error(
            `Error al eliminar imagen anterior: ${deleteError.message}`
          );
        }
      }

      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;

      const relativePath = filename.includes('maintenance/')
        ? filename.substring(filename.indexOf('maintenance/'))
        : filename;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const maintenance = await Maintenance.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: 'Mesa no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Mesa actualizada exitosamente',
      data: maintenance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la mesa',
      error: error.message,
    });
  }
};

// Activar / Desactivar mesa
export const changeMaintenanceStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activada' : 'desactivada';

    const maintenance = await Maintenance.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: 'Mesa no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: `Mesa ${action} exitosamente`,
      data: maintenance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado de la mesa',
      error: error.message,
    });
  }
};