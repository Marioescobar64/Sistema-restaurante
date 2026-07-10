'use strict';
import Reserva from './reservation-model.js';
import Pedido from '../pedido/order-model.js';
import Mesa from '../mesa/table-model.js';
import Evento from '../evento/event-model.js';

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
    const { page = 1, limit = 10, isActive = true, usuario } = req.query;

    // --- OPCIÓN B: Lógica perezosa de expiración ---
    // Buscar reservas activas y marcarlas como Finalizadas si ya pasó su fecha/hora
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const activeReservations = await Reserva.find({ estado: 'Activa' });
    for (const resItem of activeReservations) {
      if (!resItem.fecha) continue;
      const resDate = new Date(resItem.fecha);
      if (isNaN(resDate.getTime())) continue;

      const resDateOnly = new Date(resDate.getFullYear(), resDate.getMonth(), resDate.getDate());
      
      let expired = false;
      if (resDateOnly < today) {
        expired = true;
      } else if (resDateOnly.getTime() === today.getTime()) {
        const [hr, min] = (resItem.hora || "00:00").split(':').map(Number);
        if (now.getHours() > hr || (now.getHours() === hr && now.getMinutes() > min)) {
          expired = true;
        }
      }

      if (expired) {
        resItem.estado = 'Finalizada';
        await resItem.save();
      }
    }
    // ----------------------------------------------

    const filter = { isActive };
    if (usuario) {
      filter.usuario = usuario;
    }

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

    // Verificar conflictos (misma fecha, hora y mesa)
    const conflicto = await Reserva.findOne({
      fecha: payload.fecha,
      hora: payload.hora,
      mesa: payload.mesa,
      estado: { $ne: 'Cancelada' }
    });

    if (conflicto) {
      return res.status(400).json({
        success: false,
        message: `La mesa ${payload.mesa} ya está reservada para el día ${payload.fecha} a las ${payload.hora}. Por favor, elige otra mesa u otro horario.`
      });
    }

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