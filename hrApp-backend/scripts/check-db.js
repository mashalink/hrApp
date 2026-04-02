const fs = require("node:fs");
const path = require("node:path");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readDatabase() {
  const dbPath = path.join(__dirname, "..", "db.json");
  const rawContent = fs.readFileSync(dbPath, "utf8");

  try {
    return JSON.parse(rawContent);
  } catch (error) {
    fail(`db.json contains invalid JSON: ${error.message}`);
  }
}

function assertOptionalString(value, fieldName) {
  if (value === undefined || value === null) {
    return;
  }

  if (typeof value !== "string") {
    fail(`${fieldName} must be a string when provided.`);
  }
}

function validateEmployee(employee, index, usedIds) {
  const label = `employees[${index}]`;

  if (!employee || typeof employee !== "object" || Array.isArray(employee)) {
    fail(`${label} must be an object.`);
  }

  if (!Number.isInteger(employee.id)) {
    fail(`${label}.id must be an integer.`);
  }

  if (usedIds.has(employee.id)) {
    fail(`${label}.id must be unique. Duplicate id: ${employee.id}.`);
  }

  usedIds.add(employee.id);

  if (typeof employee.name !== "string" || !employee.name.trim()) {
    fail(`${label}.name must be a non-empty string.`);
  }

  if (typeof employee.email !== "string" || !employee.email.trim()) {
    fail(`${label}.email must be a non-empty string.`);
  }

  if (!Number.isFinite(employee.salary) || employee.salary < 0) {
    fail(`${label}.salary must be a non-negative number.`);
  }

  assertOptionalString(employee.title, `${label}.title`);
  assertOptionalString(employee.phone, `${label}.phone`);
  assertOptionalString(employee.animal, `${label}.animal`);
  assertOptionalString(employee.startDate, `${label}.startDate`);
  assertOptionalString(employee.location, `${label}.location`);
  assertOptionalString(employee.department, `${label}.department`);

  if (!Array.isArray(employee.skills)) {
    fail(`${label}.skills must be an array.`);
  }

  const hasInvalidSkill = employee.skills.some(
    (skill) => typeof skill !== "string" || !skill.trim(),
  );

  if (hasInvalidSkill) {
    fail(`${label}.skills must only contain non-empty strings.`);
  }
}

function main() {
  const db = readDatabase();

  if (!db || typeof db !== "object" || Array.isArray(db)) {
    fail("db.json must contain a top-level object.");
  }

  if (!Array.isArray(db.employees)) {
    fail('db.json must contain an "employees" array.');
  }

  const usedIds = new Set();
  db.employees.forEach((employee, index) => validateEmployee(employee, index, usedIds));

  console.log(`Validated ${db.employees.length} employees in db.json.`);
}

main();
