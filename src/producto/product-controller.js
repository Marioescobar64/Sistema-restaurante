'use strict';

import Producto from './product-model.js';

// Obtener todos
export const getProductos = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true, nombre, categoria } = req.query;

    const filter = {};

    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    if (nombre) {
      filter.nombre = { $regex: nombre, $options: 'i' };
    }

    if (categoria) {
      filter.categoria = { $regex: categoria, $options: 'i' };
    }

    const productos = await Producto.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Producto.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: productos,
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
      message: 'Error al obtener los productos',
      error: error.message,
    });
  }
};

// Obtener por ID
export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: producto,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el producto',
      error: error.message,
    });
  }
};

// Crear
export const createProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: producto,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el producto',
      error: error.message,
    });
  }
};

// Actualizar
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: producto,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el producto',
      error: error.message,
    });
  }
};

// Activar / Desactivar
export const changeProductoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const isActive = req.url.includes('/activate');
    const action = isActive ? 'activado' : 'desactivado';

    const producto = await Producto.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: `Producto ${action} exitosamente`,
      data: producto,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado del producto',
      error: error.message,
    });
  }
};