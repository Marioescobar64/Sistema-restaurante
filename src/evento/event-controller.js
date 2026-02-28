'use strict';
import Evento from './event-model.js';

export const getEventos = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const eventos = await Evento.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Evento.countDocuments(filter);

    res.json({
      success: true,
      data: eventos,
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

export const getEventoById = async (req, res) => {
  const evento = await Evento.findById(req.params.id);
  if (!evento) return res.status(404).json({ success: false });
  res.json({ success: true, data: evento });
};

export const createEvento = async (req, res) => {
  const evento = new Evento(req.body);
  await evento.save();
  res.status(201).json({ success: true, data: evento });
};

export const updateEvento = async (req, res) => {
  const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!evento) return res.status(404).json({ success: false });
  res.json({ success: true, data: evento });
};

export const changeEventoStatus = async (req, res) => {
  const isActive = req.url.includes('/activate');
  const evento = await Evento.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
  res.json({ success: true, data: evento });
};