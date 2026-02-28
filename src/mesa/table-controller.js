'use strict';
import Mesa from './table-model.js';

export const getMesas = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const mesas = await Mesa.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Mesa.countDocuments(filter);

    res.json({
      success: true,
      data: mesas,
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

export const getMesaById = async (req, res) => {
  const mesa = await Mesa.findById(req.params.id);
  if (!mesa) return res.status(404).json({ success: false });
  res.json({ success: true, data: mesa });
};

export const createMesa = async (req, res) => {
  const mesa = new Mesa(req.body);
  await mesa.save();
  res.status(201).json({ success: true, data: mesa });
};

export const updateMesa = async (req, res) => {
  const mesa = await Mesa.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!mesa) return res.status(404).json({ success: false });
  res.json({ success: true, data: mesa });
};

export const changeMesaStatus = async (req, res) => {
  const isActive = req.url.includes('/activate');
  const mesa = await Mesa.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
  res.json({ success: true, data: mesa });
};