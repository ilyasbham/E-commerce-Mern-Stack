const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const swaggerDocs = require("./config/swagger"); // ✅ Import Swagger config

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`❌ Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// Config
dotenv.config({ path: "./config/config.env" });

// Connect Database
connectDatabase();

// Start server
const server = app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`);

  // ✅ Initialize Swagger docs once server starts
  swaggerDocs(app);
});

// Handling unhandled promise rejections (e.g., wrong DB URI)
process.on("unhandledRejection", (err) => {
  console.log(`❌ Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
