const fs = require("node:fs");
const path = require("node:path");
const { DataTypes } = require("sequelize");
const { databaseConfig } = require("../config/env");
const { ensureDatabaseSchema, sequelize } = require("./sequelize");

const MIGRATIONS_TABLE_NAME = "_migrations";

function getMigrationsDirectory() {
  return path.join(__dirname, "migrations");
}

function getMigrationTableReference() {
  return {
    schema: databaseConfig.schema,
    tableName: MIGRATIONS_TABLE_NAME,
  };
}

function getQuotedMigrationTable() {
  return sequelize
    .getQueryInterface()
    .queryGenerator.quoteTable(getMigrationTableReference());
}

function loadMigrations() {
  return fs
    .readdirSync(getMigrationsDirectory())
    .filter((filename) => filename.endsWith(".js"))
    .sort()
    .map((filename) => ({
      name: filename,
      migration: require(path.join(getMigrationsDirectory(), filename)),
    }));
}

async function ensureMigrationsTable() {
  await ensureDatabaseSchema();

  const quotedTable = getQuotedMigrationTable();

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS ${quotedTable} (
      name TEXT PRIMARY KEY,
      run_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function getExecutedMigrationNames() {
  await ensureMigrationsTable();

  const quotedTable = getQuotedMigrationTable();
  const [rows] = await sequelize.query(
    `SELECT name FROM ${quotedTable} ORDER BY name ASC;`,
  );

  return rows.map((row) => row.name);
}

function createMigrationContext(transaction) {
  return {
    DataTypes,
    queryInterface: sequelize.getQueryInterface(),
    schema: databaseConfig.schema,
    sequelize,
    transaction,
  };
}

async function markMigrationAsExecuted(name, transaction) {
  const quotedTable = getQuotedMigrationTable();

  await sequelize.query(`INSERT INTO ${quotedTable} (name) VALUES ($1);`, {
    bind: [name],
    transaction,
  });
}

async function unmarkMigration(name, transaction) {
  const quotedTable = getQuotedMigrationTable();

  await sequelize.query(`DELETE FROM ${quotedTable} WHERE name = $1;`, {
    bind: [name],
    transaction,
  });
}

async function runMigrations() {
  await ensureMigrationsTable();

  const executedMigrationNames = new Set(await getExecutedMigrationNames());
  const appliedMigrations = [];

  for (const { name, migration } of loadMigrations()) {
    if (executedMigrationNames.has(name)) {
      continue;
    }

    const transaction = await sequelize.transaction();

    try {
      await migration.up(createMigrationContext(transaction));
      await markMigrationAsExecuted(name, transaction);
      await transaction.commit();
      appliedMigrations.push(name);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  return appliedMigrations;
}

async function getMigrationStatus() {
  const executed = await getExecutedMigrationNames();
  const executedSet = new Set(executed);
  const pending = loadMigrations()
    .map(({ name }) => name)
    .filter((name) => !executedSet.has(name));

  return {
    executed,
    pending,
  };
}

async function rollbackLastMigration() {
  const executed = await getExecutedMigrationNames();
  const migrations = loadMigrations();
  const lastExecutedMigration = migrations
    .map(({ name }) => name)
    .filter((name) => executed.includes(name))
    .at(-1);

  if (!lastExecutedMigration) {
    return null;
  }

  const migration = migrations.find(
    ({ name }) => name === lastExecutedMigration,
  )?.migration;

  if (!migration?.down) {
    throw new Error(`Migration ${lastExecutedMigration} does not implement down().`);
  }

  const transaction = await sequelize.transaction();

  try {
    await migration.down(createMigrationContext(transaction));
    await unmarkMigration(lastExecutedMigration, transaction);
    await transaction.commit();
    return lastExecutedMigration;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = {
  getMigrationStatus,
  rollbackLastMigration,
  runMigrations,
};
