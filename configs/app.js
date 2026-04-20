"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { swaggerDocs, swaggerUi } from "./documentation.js";
import { dbConnection } from "./db.js";
import { corsOptions } from "./cors-configuration.js";

// Rutas
import administrationRoutes from "../src/administration/router-administration.js";
import maintenanceRoutes from "../src/maintenance/router-maintenance.js";
import menuRoutes from "../src/menu/router-menu.js";
import productRoutes from "../src/producto/product-routes.js";
import reservationRoutes from "../src/reservacion/reservation-routes.js";
import orderRoutes from "../src/pedido/order-routes.js";
import tableRoutes from "../src/mesa/table-routes.js";
import eventRoutes from "../src/evento/event-routes.js";
import orderDetailRoutes from "../src/detallePedido/orderDetail-routes.js";
import cartRoutes from "../src/cart/cart-router.js";

const app = express();
const BASE_URL = "/papaluigi/v1";

dbConnection();

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(`${BASE_URL}/administration`, administrationRoutes);
app.use(`${BASE_URL}/maintenance`, maintenanceRoutes);
app.use(`${BASE_URL}/menu`, menuRoutes);
app.use(`${BASE_URL}/product`, productRoutes);
app.use(`${BASE_URL}/reservation`, reservationRoutes);
app.use(`${BASE_URL}/order`, orderRoutes);
app.use(`${BASE_URL}/table`, tableRoutes);
app.use(`${BASE_URL}/event`, eventRoutes);
app.use(`${BASE_URL}/orderDetail`, orderDetailRoutes);
app.use(`${BASE_URL}/cart`, cartRoutes);

app.get(`${BASE_URL}/health`, (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Papa Luigi Admin",
    version: "1.0.0",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
  });
});

app.use((err, req, res, next) => {
  console.error(`Error en el servidor: ${err.message}`);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION", err);
  process.exit(1);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
  console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});

export { app };