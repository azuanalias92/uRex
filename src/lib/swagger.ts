// lib/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'uRex API Docs',
      version: '1.0.0',
    },
  },
  apis: ['./src/app/api/**/*.ts'], // Point to your API route files with JSDoc comments
};

export const swaggerSpec = swaggerJSDoc(options);
