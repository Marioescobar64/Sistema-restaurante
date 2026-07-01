import { LoyaltyConfig, PointHistory } from './loyalty-model.js';

// Actualizar o crear la configuración de puntos (Solo GERENTE o SUPER_ADMIN)
export const updateConfig = async (req, res) => {
    try {
        const { puntosPorDolar } = req.body;

        if (!puntosPorDolar || puntosPorDolar <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Debe proveer una cantidad válida mayor a 0 para puntosPorDolar'
            });
        }

        // Buscar si ya existe la configuración global
        let config = await LoyaltyConfig.findOne({ isGlobal: true });

        if (config) {
            config.puntosPorDolar = puntosPorDolar;
            await config.save();
        } else {
            config = new LoyaltyConfig({
                puntosPorDolar,
                isGlobal: true
            });
            await config.save();
        }

        return res.status(200).json({
            success: true,
            message: 'Configuración de puntos actualizada exitosamente',
            data: config
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar configuración',
            error: error.message
        });
    }
};

// Obtener la configuración actual
export const getConfig = async (req, res) => {
    try {
        let config = await LoyaltyConfig.findOne({ isGlobal: true });
        if (!config) {
            // Retorna un default en caso de que no se haya configurado aún
            config = { puntosPorDolar: 1 };
        }

        return res.status(200).json({
            success: true,
            data: config
        });
    } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Error al obtener configuración',
            error: error.message
        });
    }
}

// Obtener el historial de puntos de los clientes
export const getHistory = async (req, res) => {
    try {
        // Podríamos filtrar por cliente si pasamos un query parameter ?clienteId=...
        const { clienteId } = req.query;
        let query = {};
        
        if (clienteId) {
            query.cliente = clienteId;
        }

        // Poblamos la información del cliente para ver su nombre y email
        const history = await PointHistory.find(query)
            .populate('cliente', 'nombre email')
            .populate('pedido', 'nombrePedido total')
            .sort({ createdAt: -1 })
            .limit(100); // Límite para no saturar

        return res.status(200).json({
            success: true,
            data: history
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el historial de puntos',
            error: error.message
        });
    }
};
