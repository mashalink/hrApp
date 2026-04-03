const fs = require("node:fs");
const path = require("node:path");
const { Employee, initializeDatabase, sequelize } = require("../src/db/sequelize");
const { runMigrations } = require("../src/db/migrator");
const {
  PayloadValidationError,
  validateSeedDatabase,
} = require("../src/validation/employees");

function readSeedDatabase() {
  const dbPath = path.join(__dirname, "..", "db.json");
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

async function resetEmployeeIdSequence() {
  const queryGenerator = sequelize.getQueryInterface().queryGenerator;
  const tableReference = Employee.getTableName();
  const quotedTable = queryGenerator.quoteTable(tableReference);
  const sequenceTarget = sequelize.escape(
    `${tableReference.schema}.${tableReference.tableName}`,
  );

  await sequelize.query(`
    SELECT setval(
      pg_get_serial_sequence(${sequenceTarget}, 'id'),
      COALESCE((SELECT MAX(id) FROM ${quotedTable}), 1),
      COALESCE((SELECT MAX(id) IS NOT NULL FROM ${quotedTable}), false)
    );
  `);
}

async function seedDatabase({ force = false } = {}) {
  const employees = validateSeedDatabase(readSeedDatabase());

  await initializeDatabase();
  await runMigrations();

  await Employee.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
  });

  await Employee.bulkCreate(employees);
  await resetEmployeeIdSequence();

  console.log(`Seeded ${employees.length} employees into PostgreSQL.`);
}

async function main() {
  try {
    await seedDatabase();
  } catch (error) {
    if (error instanceof PayloadValidationError) {
      console.error(error.issues.join("\n"));
    } else {
      console.error("Failed to seed database", error);
    }

    process.exitCode = 1;
  } finally {
    await sequelize.close().catch(() => {});
  }
}

main();
