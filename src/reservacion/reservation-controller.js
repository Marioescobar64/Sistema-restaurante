'use strict';
import Reserva from './reservation-model.js';

export const getReservas = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const reservas = await Reserva.find(filter)
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
  const reserva = await Reserva.findById(req.params.id);
  if (!reserva) return res.status(404).json({ success: false });
  res.json({ success: true, data: reserva });
};

export const createReserva = async (req, res) => {
  const reserva = new Reserva(req.body);
  await reserva.save();
  res.status(201).json({ success: true, data: reserva });
};

export const updateReserva = async (req, res) => {
  const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!reserva) return res.status(404).json({ success: false });
  res.json({ success: true, data: reserva });
};

export const changeReservaStatus = async (req, res) => {
  const isActive = req.url.includes('/activate');
  const reserva = await Reserva.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
  res.json({ success: true, data: reserva });
};