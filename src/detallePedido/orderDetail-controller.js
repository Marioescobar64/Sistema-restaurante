'use strict';
import DetallePedido from './orderDetail-model.js';

export const getDetalles = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const detalles = await DetallePedido.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await DetallePedido.countDocuments(filter);

    res.json({
      success: true,
      data: detalles,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDetalleById = async (req, res) => {
  const detalle = await DetallePedido.findById(req.params.id);
  if (!detalle) return res.status(404).json({ success: false });
  res.json({ success: true, data: detalle });
};

export const createDetalle = async (req, res) => {
  const detalle = new DetallePedido(req.body);
  await detalle.save();
  res.status(201).json({ success: true, data: detalle });
};

export const updateDetalle = async (req, res) => {
  const detalle = await DetallePedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!detalle) return res.status(404).json({ success: false });
  res.json({ success: true, data: detalle });
};

export const changeDetalleStatus = async (req, res) => {
  const isActive = req.url.includes('/activate');
  const detalle = await DetallePedido.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
  res.json({ success: true, data: detalle });
};