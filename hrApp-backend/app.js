const cors = require("cors");
const express = require("express");
const employeesRouter = require("./src/routes/employees");
const { HttpError } = require("./src/lib/httpError");
const { serverConfig } = require("./src/config/env");
const { errorHandler, notFoundHandler } = require("./src/middleware/errorHandler");

function createCorsMiddleware() {
  const { corsOrigins, nodeEnv } = serverConfig;

  if (corsOrigins.length === 0) {
    return cors({
      origin: nodeEnv === "production" ? false : true,
      methods: ["GET", "POST", "PATCH", "OPTIONS"],
    });
  }

  return cors({
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    origin(origin, callback) {
      if (!origin || corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new HttpError(403, "Origin not allowed by CORS policy."));
    },
  });
}

function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(createCorsMiddleware());
  app.use(express.json({ limit: serverConfig.jsonBodyLimit }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/employees", employeesRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = {
  createApp,
};
