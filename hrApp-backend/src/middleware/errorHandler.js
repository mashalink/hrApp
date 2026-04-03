const { UniqueConstraintError, ValidationError } = require("sequelize");
const { HttpError } = require("../lib/httpError");
const { PayloadValidationError } = require("../validation/employees");

function notFoundHandler(_req, res) {
  res.status(404).json({
    message: "Route not found.",
  });
}

function errorHandler(error, _req, res, _next) {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });
  }

  if (error instanceof PayloadValidationError) {
    return res.status(400).json({
      message: error.message,
      details: error.issues,
    });
  }

  if (error?.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "Request body contains invalid JSON.",
    });
  }

  if (error instanceof UniqueConstraintError) {
    return res.status(409).json({
      message: error.errors?.[0]?.message || "A unique field already exists.",
    });
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({
      message: error.errors?.[0]?.message || "Validation failed.",
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal server error.",
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
