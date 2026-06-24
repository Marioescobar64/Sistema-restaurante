// importaciones
import 'dotenv/config';
import { initServer } from "./configs/app.js";

// Errores no capturados
process.on('uncaughtException', (error) => {
    console.log(error);
    process.exit(1);
});

// Promesas rechazadas o no manejadas
process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
    process.exit(1);
});

// Inicializacion del servidor
console.log('Iniciando servidor...');
initServer();