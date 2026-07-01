'use strict';
import Pedido from './order-model.js';
import User from '../user/user-model.js';
import { LoyaltyConfig, PointHistory } from '../loyalty/loyalty-model.js';

export const getPedidos = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive = true } = req.query;

    const filter = { isActive };

    const pedidos = await Pedido.find(filter)
      .populate('cliente', 'nombre email')
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
  const pedido = await Pedido.findById(req.params.id).populate('cliente', 'nombre email');
  if (!pedido) return res.status(404).json({ success: false });
  res.json({ success: true, data: pedido });
};

export const createPedido = async (req, res) => {
  try {
    // Si el usuario está autenticado, asignamos su ID al cliente si no viene en el body
    if (req.user && !req.body.cliente) {
        req.body.cliente = req.user.sub;
    }

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
        // Otorgar puntos
        let config = await LoyaltyConfig.findOne({ isGlobal: true });
        const puntosPorDolar = config ? config.puntosPorDolar : 1;
        
        // Calculamos los puntos en base al total del pedido
        // Se puede usar Math.floor para redondear hacia abajo y no dar puntos fraccionarios
        const puntosGanados = Math.floor(pedidoOriginal.total * puntosPorDolar);

        if (puntosGanados > 0 && pedidoOriginal.cliente) {
            // Actualizar usuario
            await User.findByIdAndUpdate(pedidoOriginal.cliente, {
                $inc: { puntosAcumulados: puntosGanados }
            });

            // Guardar historial
            const historial = new PointHistory({
                cliente: pedidoOriginal.cliente,
                pedido: pedidoOriginal._id,
                puntosOtorgados: puntosGanados,
                motivo: 'Compra completada'
            });
            await historial.save();
        }
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