import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Upload Service API",
      version: "1.0.0",
      description:
        "REST API for uploading profile images and documents using Express, TypeScript, Multer, and Cloudinary.",
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development Server",
      },
    ],
  },
  apis: [
    "./src/docs/*.ts",
    "./src/routes/*.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    
    (swaggerUi as any).setup(
      swaggerSpec,
      {
        explorer: true,
        customSiteTitle: "Upload Service API Docs",
      },
      undefined,
      undefined,
      {
        defaultModelsExpandDepth: -1,
        defaultModelExpandDepth: -1,
      }
    )
  );
};

export default swaggerSpec;