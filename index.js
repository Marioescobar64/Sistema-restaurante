import dotenv from 'dotenv';
dotenv.config();

process.on('uncaughtException', (error) => {
    console.log(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
    process.exit(1);
});

console.log('Iniciando servidor...');
import './configs/app.js';