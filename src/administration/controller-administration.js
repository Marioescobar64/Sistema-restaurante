import Administration from './administration.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

// Obtener todos los restaurantes (con paginación y filtros)
export const getAdministrations = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const administrations = await Administration.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ restaurantdName: 1 });

    const total = await Administration.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: administrations,
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
      message: 'Error al obtener los restaurantes',
      error: error.message,
    });
  }
};

// Obtener restaurante por ID
export const getAdministrationById = async (req, res) => {
  try {
    const { id } = req.params;

    const administration = await Administration.findById(id);

    if (!administration) {
      return res.status(404).json({
        success: false,
        message: 'Restaurante no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: administration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el restaurante',
      error: error.message,
    });
  }
};

// Crear restaurante
export const createAdministration = async (req, res) => {
  try {
    const administrationData = req.body;

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;

      const relativePath = filename.includes('administration/')
        ? filename.substring(filename.indexOf('administration/'))
        : filename;

      administrationData.photo = `${relativePath}.${extension}`;
    } else {
      administrationData.photo = 'administration/restaurant';
    }

    const administration = new Administration(administrationData);
    await administration.save();

    res.status(201).json({
      success: true,
      message: 'Restaurante creado exitosamente',
      data: administration,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el restaurante',
      error: error.message,
    });
  }
};

// Actualizar restaurante
export const updateAdministration = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const currentAdministration = await Administration.findById(id);

      // Eliminar imagen anterior de Cloudinary
      if (currentAdministration && currentAdministration.photo) {
        const photoPath = currentAdministration.photo;
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

      const relativePath = filename.includes('administration/')
        ? filename.substring(filename.indexOf('administration/'))
        : filename;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const administration = await Administration.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!administration) {
      return res.status(404).json({
        success: false,
        message: 'Restaurante no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Restaurante actualizado exitosamente',
      data: administration,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el restaurante',
      error: error.message,
    });
  }
};

// Activar / Desactivar restaurante
export const changeAdministrationStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activado' : 'desactivado';

    const administration = await Administration.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!administration) {
      return res.status(404).json({
        success: false,
        message: 'Restaurante no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Restaurante ${action} exitosamente`,
      data: administration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado del restaurante',
      error: error.message,
    });
  }
};