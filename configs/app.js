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

const BASE_URL = '/papaluigi/v1';

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
const routes =(app) => {
    app.use(`${BASE_URL}/administration`, administrationRoutes);
    app.use(`${BASE_URL}/maintenance`, maintenanceRoutes);
    app.use(`${BASE_URL}/menu`, menuRoutes);
}

// funcion para iniciar el servidor
const initServer = async (app) => {
    // Creacion de la instancia de la aplicacion
    app = express();
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