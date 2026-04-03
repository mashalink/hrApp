const fs = require("node:fs");
const path = require("node:path");
const {
  validateSeedDatabase,
  PayloadValidationError,
} = require("../src/validation/employees");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readSeedDatabase() {
  const dbPath = path.join(__dirname, "..", "db.json");
  const rawContent = fs.readFileSync(dbPath, "utf8");

  try {
    return JSON.parse(rawContent);
  } catch (error) {
    fail(`db.json contains invalid JSON: ${error.message}`);
  }
}

function main() {
  try {
    const db = readSeedDatabase();
    const employees = validateSeedDatabase(db);
    console.log(`Validated ${employees.length} employees in db.json.`);
  } catch (error) {
    if (error instanceof PayloadValidationError) {
      fail(error.issues.join("\n"));
    }

    fail(error.message);
  }
}

main();
