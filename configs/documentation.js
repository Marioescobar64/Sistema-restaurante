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
          required: ["restaurantdName", "categoryType", "capacity"],
          properties: {
            restaurantdName: {
              type: "string",
              description: "Nombre del restaurante",
            },
            categoryType: {
              type: "string",
              enum: ["FAMILIAR", "ROMANTICO", "GENERAL"],
              description: "Tipo de categoría del restaurante",
            },
            capacity: {
              type: "integer",
              minimum: 1,
              description: "Capacidad del restaurante",
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
          required: ["name", "price"],
          properties: {
            name: {
              type: "string",
              description: "Nombre del menú",
            },
            price: {
              type: "number",
              description: "Precio del menú",
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
          required: ["nombre", "descripcion", "precio", "categoria"],
          properties: {
            nombre: {
              type: "string",
              maxLength: 100,
              description: "Nombre del producto",
            },
            descripcion: {
              type: "string",
              description: "Descripción del producto",
            },
            precio: {
              type: "number",
              minimum: 0,
              description: "Precio del producto",
            },
            categoria: {
              type: "string",
              description: "Categoría del producto",
            },
          },
        },
        table: {
          type: "object",
          required: ["descripcion", "numeroMesa", "capacidad"],
          properties: {
            descripcion: {
              type: "string",
              description: "Descripción de la mesa",
            },
            numeroMesa: {
              type: "integer",
              minimum: 1,
              description: "Número de la mesa",
            },
            capacidad: {
              type: "integer",
              minimum: 1,
              description: "Capacidad de personas",
            },
            estado: {
              type: "string",
              enum: ["Disponible", "Ocupada", "Reservada"],
              description: "Estado de la mesa",
            },
          },
        },
        order: {
          type: "object",
          required: ["nombrePedido", "descripcion", "total"],
          properties: {
            nombrePedido: {
              type: "string",
              maxLength: 100,
              description: "Nombre del pedido",
            },
            descripcion: {
              type: "string",
              description: "Descripción del pedido",
            },
            total: {
              type: "number",
              minimum: 0,
              description: "Total del pedido",
            },
            estado: {
              type: "string",
              enum: ["Pendiente", "En proceso", "Entregado", "Cancelado"],
              description: "Estado del pedido",
            },
          },
        },
        orderDetail: {
          type: "object",
          required: ["descripcion", "cantidad", "precioUnitario", "subtotal"],
          properties: {
            descripcion: {
              type: "string",
              description: "Descripción del detalle",
            },
            cantidad: {
              type: "integer",
              minimum: 1,
              description: "Cantidad del producto",
            },
            precioUnitario: {
              type: "number",
              minimum: 0,
              description: "Precio unitario del producto",
            },
            subtotal: {
              type: "number",
              minimum: 0,
              description: "Subtotal del detalle",
            },
          },
        },
        reservation: {
          type: "object",
          required: ["eventoId", "descripcion", "usuario", "mesa", "fecha", "hora", "cantidadPersonas"],
          properties: {
            eventoId: {
              type: "string",
              description: "ID del evento asociado",
            },
            descripcion: {
              type: "string",
              description: "Descripción de la reservación",
            },
            usuario: {
              type: "string",
              description: "Nombre del usuario que reserva",
            },
            mesa: {
              type: "integer",
              minimum: 1,
              description: "Número de mesa",
            },
            fecha: {
              type: "string",
              format: "date",
              description: "Fecha de la reservación en formato ISO",
            },
            hora: {
              type: "string",
              description: "Hora de la reservación",
            },
            cantidadPersonas: {
              type: "integer",
              minimum: 1,
              description: "Cantidad de personas",
            },
            estado: {
              type: "string",
              enum: ["Activa", "Cancelada", "Finalizada"],
              description: "Estado de la reservación",
            },
          },
        },
        event: {
          type: "object",
          required: ["nombreEvento", "descripcion", "fecha", "horaInicio", "horaFin"],
          properties: {
            nombreEvento: {
              type: "string",
              maxLength: 150,
              description: "Nombre del evento",
            },
            descripcion: {
              type: "string",
              description: "Descripción del evento",
            },
            fecha: {
              type: "string",
              format: "date",
              description: "Fecha del evento en formato ISO",
            },
            horaInicio: {
              type: "string",
              description: "Hora de inicio del evento",
            },
            horaFin: {
              type: "string",
              description: "Hora de fin del evento",
            },
          },
        },
        maintenance: {
        type: "object",
        required: ["tableNumber", "capacity", "location"],
        properties: {
          tableNumber: {
            type: "integer",
            minimum: 1,
            description: "Número de mesa",
          },
          capacity: {
            type: "integer",
            minimum: 1,
            description: "Capacidad de la mesa",
          },
          location: {
            type: "string",
            enum: ["Salón Principal", "Terraza", "Área VIP", "Jardín", "Interior"],
            description: "Ubicación de la mesa",
          },
          status: {
            type: "string",
            enum: ["Disponible", "Ocupada", "Reservada", "Mantenimiento"],
            description: "Estado de la mesa",
          },
          photo: {
            type: "string",
            format: "binary",
            description: "Foto de la mesa",
          },
          isActive: {
            type: "boolean",
            description: "Estado activo/inactivo",
          },
        },
      },
        cart: {
          type: "object",
          required: ["orderId", "items"],
          properties: {
            orderId: {
              type: "string",
              description: "ID del pedido asociado",
            },
            items: {
              type: "array",
              minItems: 1,
              description: "Lista de productos en el carrito",
              items: {
                type: "object",
                required: ["menuItem", "quantity", "price", "subtotal"],
                properties: {
                  menuItem: {
                    type: "string",
                    description: "ID del platillo",
                  },
                  quantity: {
                    type: "integer",
                    minimum: 1,
                    description: "Cantidad del producto",
                  },
                  price: {
                    type: "number",
                    minimum: 0,
                    description: "Precio unitario",
                  },
                  subtotal: {
                    type: "number",
                    minimum: 0,
                    description: "Subtotal del producto",
                  },
                },
              },
            },
            total: {
              type: "number",
              minimum: 0,
              description: "Total del carrito",
            },
            status: {
              type: "string",
              enum: ["activo", "confirmado", "cancelado"],
              description: "Estado del carrito",
            },
          },
        },        // cierra cart
      },          // cierra schemas
    },            // cierra components
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: "http://localhost:3001/papaluigi/v1",
        description: "Servidor local",
      },
    ],
    tags: [
      { name: "Administrations", description: "Gestión del restaurante" },
      { name: "Menus", description: "Gestor de menus del restaurante" },
      { name: "Products", description: "Gestor de productos y platillos" },
      { name: "Tables", description: "Gestión de las mesas del restaurante" },
      { name: "Orders", description: "Gestión de los pedidos" },
      { name: "OrderDetails", description: "Gestión de los detalles del pedidos" },
      { name: "Reservations", description: "Gestión de reservaciones" },
      { name: "Events", description: "Gestión de eventos del restaurante" },
      { name: "Maintenances", description: "Gestión de mantenimientos" },
      { name: "Carts", description: "Gestión de carritos de compras" },
    ],
  },              // cierra swaggerDefinition
  apis: [
    path.join(__dirname, "../src/**/*.js"),
  ],
};              // cierra swaggerOptions

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };