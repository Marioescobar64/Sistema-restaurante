'use strict';
import Cart from './cart-model.js';

export const getCarts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = 'activo' } = req.query;

    const filter = { status };

    const carts = await Cart.find(filter)
      .populate('orderId')
      .populate('items.menuItem')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Cart.countDocuments(filter);

    res.json({
      success: true,
      data: carts,
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

export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate('orderId')
      .populate('items.menuItem');

    if (!cart) return res.status(404).json({ success: false });

    res.json({ success: true, data: cart });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCart = async (req, res) => {
  try {

    const cart = new Cart(req.body);

    await cart.save();

    res.status(201).json({
      success: true,
      data: cart
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!cart) return res.status(404).json({ success: false });

    res.json({
      success: true,
      data: cart
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changeCartStatus = async (req, res) => {
  try {

    const status = req.url.includes('/activate') ? 'activo' : 'cancelado';

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      data: cart
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};