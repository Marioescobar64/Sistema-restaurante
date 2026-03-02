'use strict';
import Pedido from './order-model.js';

export const getPedidos = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const pedidos = await Pedido.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Pedido.countDocuments(filter);

    res.json({
      success: true,
      data: pedidos,
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

export const getPedidoById = async (req, res) => {
  const pedido = await Pedido.findById(req.params.id);
  if (!pedido) return res.status(404).json({ success: false });
  res.json({ success: true, data: pedido });
};

export const createPedido = async (req, res) => {
  const pedido = new Pedido(req.body);
  await pedido.save();
  res.status(201).json({ success: true, data: pedido });
};

export const updatePedido = async (req, res) => {
  const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!pedido) return res.status(404).json({ success: false });
  res.json({ success: true, data: pedido });
};

export const changePedidoStatus = async (req, res) => {
  const isActive = req.url.includes('/activate');
  const pedido = await Pedido.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
  res.json({ success: true, data: pedido });
};