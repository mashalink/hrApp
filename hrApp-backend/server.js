const { createApp } = require("./app");
const { serverConfig } = require("./src/config/env");
const { initializeDatabase } = require("./src/db/sequelize");

async function startServer() {
  await initializeDatabase();

  const app = createApp();

  app.listen(serverConfig.port, () => {
    console.log(`HR backend is running on port ${serverConfig.port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start backend", error);
  process.exit(1);
});
