const { Router } = require("express");
const { Employee } = require("../db/sequelize");
const { HttpError } = require("../lib/httpError");
const { normalizeEmployeePayload } = require("../validation/employees");

const router = Router();

function asyncHandler(handler) {
  return function wrappedHandler(req, res, next) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function parseEmployeeId(rawId) {
  const employeeId = Number.parseInt(rawId, 10);

  if (!Number.isInteger(employeeId) || employeeId <= 0) {
    throw new HttpError(400, "Employee id must be a positive integer.");
  }

  return employeeId;
}

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const employees = await Employee.findAll({
      order: [["id", "ASC"]],
    });

    res.json(employees);
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const payload = normalizeEmployeePayload(req.body);
    const employee = await Employee.create(payload);
    res.status(201).json(employee);
  }),
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const employeeId = parseEmployeeId(req.params.id);
    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      throw new HttpError(404, `Employee ${employeeId} not found.`);
    }

    const payload = normalizeEmployeePayload(req.body, { partial: true });

    if (Object.keys(payload).length === 0) {
      throw new HttpError(400, "At least one field must be provided.");
    }

    await employee.update(payload);
    res.json(employee);
  }),
);

module.exports = router;
