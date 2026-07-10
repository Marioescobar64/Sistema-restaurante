'use strict';
import Pedido from './order-model.js';
import User from '../user/user-model.js';
import { LoyaltyConfig, PointHistory } from '../loyalty/loyalty-model.js';

export const getPedidos = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const pedidos = await Pedido.find(filter)
      .populate('mesa', 'numeroMesa descripcion')
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
  const pedido = await Pedido.findById(req.params.id).populate('mesa', 'numeroMesa descripcion');
  if (!pedido) return res.status(404).json({ success: false });
  res.json({ success: true, data: pedido });
};

export const createPedido = async (req, res) => {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.status(201).json({ success: true, data: pedido });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePedido = async (req, res) => {
  try {
    const pedidoId = req.params.id;
    const updates = req.body;

    const pedidoOriginal = await Pedido.findById(pedidoId);
    if (!pedidoOriginal) return res.status(404).json({ success: false, message: 'Pedido no encontrado' });

    // Verificamos si el estado va a cambiar a 'Entregado'
    if (updates.estado === 'Entregado' && pedidoOriginal.estado !== 'Entregado') {
        // Lógica de puntos removida porque el cliente se quitó del pedido
    }

    const pedidoActualizado = await Pedido.findByIdAndUpdate(pedidoId, updates, { new: true });
    res.json({ success: true, data: pedidoActualizado });
  } catch(error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changePedidoStatus = async (req, res) => {
  const isActive = req.url.includes('/activate');
  const pedido = await Pedido.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
  res.json({ success: true, data: pedido });
};