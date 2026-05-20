'use strict';
import Reserva from './reservation-model.js';
import Pedido from '../pedido/order-model.js';
import Mesa from '../mesa/table-model.js';

async function buildOrderSummary(orderId) {
  if (!orderId) return undefined;
  const pedido = await Pedido.findById(orderId);
  if (!pedido) return undefined;
  return {
    nombrePedido: pedido.nombrePedido,
    total: pedido.total,
    estado: pedido.estado
  };
}

async function resolveMesaData(payload) {
  const resolved = { ...payload };
  if (payload.mesaId && !payload.mesa) {
    const mesa = await Mesa.findById(payload.mesaId);
    if (mesa) {
      resolved.mesa = mesa.numeroMesa;
    }
  }
  if (!payload.mesaId && payload.mesa) {
    const mesa = await Mesa.findOne({ numeroMesa: payload.mesa });
    if (mesa) {
      resolved.mesaId = mesa._id;
    }
  }
  return resolved;
}

export const getReservas = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const reservas = await Reserva.find(filter)
      .populate('eventoId')
      .populate('mesaId')
      .populate('orderId')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Reserva.countDocuments(filter);

    res.json({
      success: true,
      data: reservas,
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

export const getReservaById = async (req, res) => {
  const reserva = await Reserva.findById(req.params.id)
    .populate('eventoId')
    .populate('mesaId')
    .populate('orderId');
  if (!reserva) return res.status(404).json({ success: false });
  res.json({ success: true, data: reserva });
};

export const createReserva = async (req, res) => {
  try {
    let payload = { ...req.body };
    payload = await resolveMesaData(payload);
    if (payload.orderId) {
      payload.resumenPedido = await buildOrderSummary(payload.orderId);
    }
    const reserva = new Reserva(payload);
    await reserva.save();
    const populatedReserva = await Reserva.findById(reserva._id)
      .populate('eventoId')
      .populate('mesaId')
      .populate('orderId');
    res.status(201).json({ success: true, data: populatedReserva });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReserva = async (req, res) => {
  try {
    let payload = { ...req.body };
    payload = await resolveMesaData(payload);
    if (payload.orderId) {
      payload.resumenPedido = await buildOrderSummary(payload.orderId);
    }
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!reserva) return res.status(404).json({ success: false });
    const populatedReserva = await Reserva.findById(reserva._id)
      .populate('eventoId')
      .populate('mesaId')
      .populate('orderId');
    res.json({ success: true, data: populatedReserva });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changeReservaStatus = async (req, res) => {
  const isActive = req.url.includes('/activate');
  const reserva = await Reserva.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
  res.json({ success: true, data: reserva });
};