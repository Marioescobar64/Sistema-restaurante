'use strict';

// Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';

// Rutas
import administrationRoutes from '../src/administration/router-administration.js';
import maintenanceRoutes from '../src/maintenance/router-maintenance.js';
import menuRoutes from '../src/menu/router-menu.js';
import productRoutes from '../src/producto/product-routes.js';
import reservationRoutes from '../src/reservacion/reservation-routes.js';
import orderRoutes from '../src/pedido/order-routes.js';
import tableRoutes from '../src/mesa/table-routes.js';
import eventRoutes from '../src/evento/event-routes.js';
import orderDetailRoutes from '../src/detallePedido/orderDetail-routes.js';
import cartRoutes from '../src/cart/cart-router.js';
import authRoutes from '../src/auth/auth-routes.js';
import branchRoutes from '../src/branch/router-branch.js';
import loyaltyRoutes from '../src/loyalty/loyalty-routes.js';

const BASE_URL = '/papaluigi/v1';
const LEGACY_BASE_URL = '/api/v1';
const ROUTE_BASES = [BASE_URL, LEGACY_BASE_URL];

// Configuracion de los middlewares (la aplicacion)
const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb'}));
    // esta linea le indica a express que los archivos tengan un limite de 10mb
    app.use(express.json({limit: '10mb'}));
    // cors utiliza la funcion que creamos en cors-configuration
    app.use(cors(corsOptions));
    // Morgan se encarga del manejo de errores
    app.use(morgan('dev'));
}

// Rutas de integracion de todas las rutas
const routes = (app) => {
    ROUTE_BASES.forEach((base) => {
        app.use(`${base}/auth`, authRoutes);
        app.use(`${base}/administration`, administrationRoutes);
        app.use(`${base}/maintenance`, maintenanceRoutes);
        app.use(`${base}/menu`, menuRoutes);
        app.use(`${base}/product`, productRoutes);
        app.use(`${base}/reservation`, reservationRoutes);
        app.use(`${base}/order`, orderRoutes);
        app.use(`${base}/table`, tableRoutes);
        app.use(`${base}/event`, eventRoutes);
        app.use(`${base}/orderDetail`, orderDetailRoutes);
        app.use(`${base}/cart`, cartRoutes);
        app.use(`${base}/branch`, branchRoutes);
        app.use(`${base}/loyalty`, loyaltyRoutes);
    });
}

// funcion para iniciar el servidor
const initServer = async () => {
    // Creacion de la instancia de la aplicacion
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        dbConnection();
        middlewares(app);
        routes(app);
        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`)
        });

        // Primera ruta
        app.get(`${BASE_URL}/health`, (req, res) => { 
            res.status(200).json(
                {
                    status: 'ok',
                    service: 'Papa Luigi Admin',
                    version: '1.0.0'
                }
            );
        });

    } catch (error) {
        console.log(error);
    }
}

export  { initServer };