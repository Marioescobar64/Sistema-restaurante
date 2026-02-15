import Menu from './menu.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

// Obtener todos los platillos (paginación + filtros)
export const getMenus = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const menus = await Menu.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ saucerName: 1 });

    const total = await Menu.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: menus,
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
      message: 'Error al obtener los platillos',
      error: error.message,
    });
  }
};

// Obtener platillo por ID
export const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Platillo no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el platillo',
      error: error.message,
    });
  }
};

// Crear platillo
export const createMenu = async (req, res) => {
  try {
    const menuData = req.body;

    if (req.file) {
      const extension = req.file.path.split('.').pop();
      const filename = req.file.filename;

      const relativePath = filename.includes('menu/')
        ? filename.substring(filename.indexOf('menu/'))
        : filename;

      menuData.photo = `${relativePath}.${extension}`;
    } else {
      menuData.photo = 'administration/saucer';
    }

    const menu = new Menu(menuData);
    await menu.save();

    res.status(201).json({
      success: true,
      message: 'Platillo creado exitosamente',
      data: menu,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el platillo',
      error: error.message,
    });
  }
};

// Actualizar platillo
export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      const currentMenu = await Menu.findById(id);

      // Eliminar imagen anterior de Cloudinary
      if (currentMenu && currentMenu.photo) {
        const photoPath = currentMenu.photo;
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

      const relativePath = filename.includes('menu/')
        ? filename.substring(filename.indexOf('menu/'))
        : filename;

      updateData.photo = `${relativePath}.${extension}`;
    }

    const menu = await Menu.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Platillo no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Platillo actualizado exitosamente',
      data: menu,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el platillo',
      error: error.message,
    });
  }
};

// Activar / Desactivar platillo
export const changeMenuStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activado' : 'desactivado';

    const menu = await Menu.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Platillo no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Platillo ${action} exitosamente`,
      data: menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado del platillo',
      error: error.message,
    });
  }
};
