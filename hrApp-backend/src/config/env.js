const path = require("node:path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

function parseInteger(value, fallbackValue) {
  const nextValue = Number.parseInt(value ?? "", 10);
  return Number.isNaN(nextValue) ? fallbackValue : nextValue;
}

function parseBoolean(value, fallbackValue) {
  if (value === undefined) {
    return fallbackValue;
  }

  return value === "true";
}

function parseCsv(value) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

const serverConfig = {
  corsOrigins: parseCsv(process.env.CORS_ORIGIN),
  jsonBodyLimit: process.env.JSON_BODY_LIMIT || "100kb",
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInteger(process.env.PORT, 3001),
};

const databaseConfig = {
  url: process.env.DATABASE_URL || "",
  schema: process.env.DB_SCHEMA || "public",
  ssl: parseBoolean(process.env.DB_SSL, false),
  logSql: parseBoolean(process.env.DB_LOG_SQL, false),
};

function getRequiredDatabaseUrl() {
  if (!databaseConfig.url) {
    throw new Error(
      "DATABASE_URL is required. Copy hrApp-backend/.env.example to hrApp-backend/.env and update it for your PostgreSQL instance.",
    );
  }

  return databaseConfig.url;
}

module.exports = {
  databaseConfig,
  getRequiredDatabaseUrl,
  serverConfig,
};
