import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Gestor de Restaurantes API',
            version: '1.0.0',
            description: 'Documentación de las APIs para el sistema de gestión de restaurantes'
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1', // Ajusta el puerto y ruta base de tu proyecto
                description: 'Servidor local'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{ bearerAuth: [] }],
        // Aquí cambias los tags a los de tu proyecto
        tags: [
            { name: 'Restaurantes', description: 'Gestión de información de restaurantes' },
            { name: 'Usuarios', description: 'Gestión de clientes y administradores' },
            { name: 'Menús', description: 'Platillos y categorías' }
        ]
    },
    apis: [
        './src/routes/*.js', 
        './src/controllers/*.js'
    ]
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('📄 Swagger Docs disponibles en http://localhost:3000/api-docs');
};