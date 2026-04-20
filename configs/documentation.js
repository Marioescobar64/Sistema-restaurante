import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Gestor de Restaurantes API",
      version: "1.0.0",
      description:
        "Documentación de las APIs para el sistema de gestión de restaurantes",
      contact: {
        name: "Papas Luigi",
        email: "papaluigi@gmail.com",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        administration: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Nombre del restaurante",
            },
            address: {
              type: "string",
              description: "Dirección del restaurante",
            },
            photo: {
              type: "string",
              format: "binary",
              description: "Foto del restaurante",
            },
          },
        },
        menu: {
          type: "object",
          properties: {
            restaurantId: {
              type: "string",
              description: "ID del restaurante asociado",
            },
            name: {
              type: "string",
              description: "Nombre del menú",
            },
            description: {
              type: "string",
              description: "Descripción del menú",
            },
            photo: {
              type: "string",
              format: "binary",
              description: "Imagen del menú",
            },
          },
        },
        product: {
          type: "object",
          properties: {
            menuId: {
              type: "string",
              description: "ID del menú asociado",
            },
            name: {
              type: "string",
              description: "Nombre del producto",
            },
            price: {
              type: "number",
              description: "Precio del producto",
            },
            description: {
              type: "string",
              description: "Descripción del producto",
            },
          },
        },
        table: {
          type: "object",
          properties: {
            restaurantId: {
              type: "string",
              description: "ID del restaurante asociado",
            },
            number: {
              type: "integer",
              description: "Número de la mesa",
            },
            capacity: {
              type: "integer",
              description: "Capacidad de personas",
            },
          },
        },
        order: {
          type: "object",
          properties: {
            tableId: {
              type: "string",
              description: "ID de la mesa asociada",
            },
            userId: {
              type: "string",
              description: "ID del usuario que realizó el pedido",
            },
            status: {
              type: "string",
              description: "Estado del pedido",
            },
          },
        },
        orderDetail: {
          type: "object",
          properties: {
            orderId: {
              type: "string",
              description: "ID del pedido asociado",
            },
            productId: {
              type: "string",
              description: "ID del producto",
            },
            quantity: {
              type: "integer",
              description: "Cantidad del producto",
            },
            unitPrice: {
              type: "number",
              description: "Precio unitario al momento del pedido",
            },
          },
        },
        reservation: {
          type: "object",
          properties: {
            tableId: {
              type: "string",
              description: "ID de la mesa a reservar",
            },
            userId: {
              type: "string",
              description: "ID del usuario que reserva",
            },
            reservationDate: {
              type: "string",
              format: "date-time",
              description: "Fecha y hora de la reservación en formato ISO",
            },
            partySize: {
              type: "integer",
              description: "Número de personas",
            },
          },
        },
        event: {
          type: "object",
          properties: {
            restaurantId: {
              type: "string",
              description: "ID del restaurante asociado",
            },
            title: {
              type: "string",
              description: "Título del evento",
            },
            description: {
              type: "string",
              description: "Descripción detallada del evento",
            },
            eventDate: {
              type: "string",
              format: "date-time",
              description: "Fecha y hora del evento en formato ISO",
            },
          },
        },
        maintenance: {
          type: "object",
          properties: {
            restaurantId: {
              type: "string",
              description: "ID del restaurante asociado",
            },
            description: {
              type: "string",
              description: "Descripción del mantenimiento",
            },
            scheduledDate: {
              type: "string",
              format: "date-time",
              description: "Fecha programada del mantenimiento",
            },
            photo: {
              type: "string",
              format: "binary",
              description: "Imagen del mantenimiento",
            },
          },
        },
        cart: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "ID del usuario propietario del carrito",
            },
            items: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Lista de IDs de productos en el carrito",
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Servidor local",
      },
    ],
    tags: [
      {
        name: "Administration",
        description: "Gestión del restaurante",
      },
      {
        name: "Menu",
        description: "Gestor de menus del restaurante",
      },
      {
        name: "Product",
        description: "Gestor de productos y platillos",
      },
      {
        name: "Table",
        description: "Gestión de las mesas del restaurante",
      },
      {
        name: "Order",
        description: "Gestión de los pedidos",
      },
      {
        name: "OrderDetail",
        description: "Gestión de los detalles del pedidos",
      },
      {
        name: "Reservation",
        description: "Gestión de reservaciones",
      },
      {
        name: "Event",
        description: "Gestión de eventos del restaurante",
      },
      {
        name: "Maintenance",
        description: "Gestión de mantenimientos",
      },
      {
        name: "Cart",
        description: "Gestión de carritos de compras",
      },
    ],
  },
  apis: [
    path.join(__dirname, "../src/routes/*.js"),
    path.join(__dirname, "./src/routes/*.js"),
  ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };