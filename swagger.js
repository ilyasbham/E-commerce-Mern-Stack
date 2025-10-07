const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API documentation for your MERN E-commerce project",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1", // change port if different
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your API routes for annotations
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📑 Swagger docs available at: http://localhost:5000/api-docs");
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - Stock
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id of the product
 *         name:
 *           type: string
 *           description: Product name
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *         Stock:
 *           type: number
 *         rating:
 *           type: number
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               public_id:
 *                 type: string
 *               url:
 *                 type: string
 *         createdAt:
 *           type: string
 *           format: date
 *       example:
 *         name: iPhone 15
 *         description: Latest Apple phone
 *         price: 1200
 *         category: Electronics
 *         Stock: 10
 */

module.exports = swaggerDocs;
