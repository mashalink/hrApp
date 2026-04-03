const { Sequelize } = require("sequelize");
const { databaseConfig, getRequiredDatabaseUrl } = require("../config/env");
const { defineEmployeeModel } = require("../models/Employee");

const sequelize = new Sequelize(getRequiredDatabaseUrl(), {
  dialect: "postgres",
  logging: databaseConfig.logSql ? console.log : false,
  dialectOptions: databaseConfig.ssl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : undefined,
});

const Employee = defineEmployeeModel(sequelize, databaseConfig.schema);

async function ensureDatabaseSchema() {
  if (!databaseConfig.schema) {
    return;
  }

  const queryGenerator = sequelize.getQueryInterface().queryGenerator;
  const quotedSchema = queryGenerator.quoteIdentifier(databaseConfig.schema);

  await sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${quotedSchema};`);
}

async function initializeDatabase({ sync = true, force = false } = {}) {
  await sequelize.authenticate();
  await ensureDatabaseSchema();

  if (sync) {
    await sequelize.sync({ force });
  }
}

module.exports = {
  Employee,
  initializeDatabase,
  sequelize,
};
