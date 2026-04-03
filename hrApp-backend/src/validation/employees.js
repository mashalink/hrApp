const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const OPTIONAL_STRING_FIELDS = [
  "title",
  "phone",
  "animal",
  "startDate",
  "location",
  "department",
];

class PayloadValidationError extends Error {
  constructor(message, issues) {
    super(message);
    this.name = "PayloadValidationError";
    this.issues = issues;
  }
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeOptionalString(value, fieldName, issues) {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return "";
  }

  if (typeof value !== "string") {
    issues.push(`${fieldName} must be a string.`);
    return undefined;
  }

  return value.trim();
}

function normalizeRequiredString(value, fieldName, issues) {
  if (typeof value !== "string" || !value.trim()) {
    issues.push(`${fieldName} is required.`);
    return undefined;
  }

  return value.trim();
}

function normalizeSalary(value, issues, { required }) {
  if (value === undefined) {
    if (required) {
      issues.push("salary is required.");
    }

    return undefined;
  }

  if (value === null || value === "") {
    issues.push("salary is required.");
    return undefined;
  }

  const numericValue = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(numericValue) || !Number.isInteger(numericValue)) {
    issues.push("salary must be an integer.");
    return undefined;
  }

  if (numericValue < 0) {
    issues.push("salary must be 0 or more.");
    return undefined;
  }

  return numericValue;
}

function normalizeEmail(value, issues, { required }) {
  if (value === undefined) {
    if (required) {
      issues.push("email is required.");
    }

    return undefined;
  }

  if (typeof value !== "string" || !value.trim()) {
    issues.push("email is required.");
    return undefined;
  }

  const normalizedEmail = value.trim();

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    issues.push("email must be a valid email address.");
    return undefined;
  }

  return normalizedEmail;
}

function normalizeStartDate(value, issues) {
  if (value === null || value === "") {
    return null;
  }

  const normalizedValue = normalizeOptionalString(value, "startDate", issues);

  if (normalizedValue === undefined) {
    return normalizedValue;
  }

  if (!ISO_DATE_PATTERN.test(normalizedValue)) {
    issues.push("startDate must use YYYY-MM-DD format.");
    return undefined;
  }

  return normalizedValue;
}

function normalizeSkills(value, issues, { required }) {
  if (value === undefined) {
    return required ? [] : undefined;
  }

  if (!Array.isArray(value)) {
    issues.push("skills must be an array of strings.");
    return undefined;
  }

  const normalizedSkills = value.map((skill) => {
    if (typeof skill !== "string") {
      issues.push("skills must only contain strings.");
      return null;
    }

    const trimmedSkill = skill.trim();

    if (!trimmedSkill) {
      issues.push("skills must not contain empty values.");
      return null;
    }

    return trimmedSkill;
  });

  return normalizedSkills.filter(Boolean);
}

function normalizeEmployeePayload(payload, { partial = false } = {}) {
  if (!isPlainObject(payload)) {
    throw new PayloadValidationError("Invalid employee payload.", [
      "Request body must be a JSON object.",
    ]);
  }

  const issues = [];
  const normalizedPayload = {};

  const normalizedName = partial
    ? normalizeOptionalString(payload.name, "name", issues)
    : normalizeRequiredString(payload.name, "name", issues);

  if (normalizedName !== undefined) {
    if (!normalizedName) {
      issues.push("name is required.");
    } else {
      normalizedPayload.name = normalizedName;
    }
  }

  const normalizedEmail = normalizeEmail(payload.email, issues, { required: !partial });
  if (normalizedEmail !== undefined) {
    normalizedPayload.email = normalizedEmail;
  }

  const normalizedSalary = normalizeSalary(payload.salary, issues, {
    required: !partial,
  });
  if (normalizedSalary !== undefined) {
    normalizedPayload.salary = normalizedSalary;
  }

  for (const fieldName of OPTIONAL_STRING_FIELDS) {
    const normalizedValue =
      fieldName === "startDate"
        ? normalizeStartDate(payload[fieldName], issues)
        : normalizeOptionalString(payload[fieldName], fieldName, issues);

    if (normalizedValue !== undefined) {
      normalizedPayload[fieldName] = normalizedValue;
    }
  }

  const normalizedSkills = normalizeSkills(payload.skills, issues, {
    required: !partial,
  });
  if (normalizedSkills !== undefined) {
    normalizedPayload.skills = normalizedSkills;
  }

  if (issues.length > 0) {
    throw new PayloadValidationError("Employee payload validation failed.", issues);
  }

  return normalizedPayload;
}

function validateSeedDatabase(db) {
  if (!isPlainObject(db)) {
    throw new PayloadValidationError("Seed data must be an object.", [
      "db.json must contain a top-level object.",
    ]);
  }

  if (!Array.isArray(db.employees)) {
    throw new PayloadValidationError("Seed data must contain employees.", [
      'db.json must contain an "employees" array.',
    ]);
  }

  const issues = [];
  const usedIds = new Set();

  const employees = db.employees.map((employee, index) => {
    if (!isPlainObject(employee)) {
      issues.push(`employees[${index}] must be an object.`);
      return null;
    }

    if (!Number.isInteger(employee.id) || employee.id <= 0) {
      issues.push(`employees[${index}].id must be a positive integer.`);
    } else if (usedIds.has(employee.id)) {
      issues.push(
        `employees[${index}].id must be unique. Duplicate id: ${employee.id}.`,
      );
    } else {
      usedIds.add(employee.id);
    }

    try {
      return {
        id: employee.id,
        ...normalizeEmployeePayload(employee),
      };
    } catch (error) {
      if (error instanceof PayloadValidationError) {
        for (const issue of error.issues) {
          issues.push(`employees[${index}].${issue}`);
        }

        return null;
      }

      throw error;
    }
  });

  if (issues.length > 0) {
    throw new PayloadValidationError("Seed data validation failed.", issues);
  }

  return employees.filter(Boolean);
}

module.exports = {
  normalizeEmployeePayload,
  PayloadValidationError,
  validateSeedDatabase,
};
