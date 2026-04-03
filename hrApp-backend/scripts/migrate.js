const { sequelize } = require("../src/db/sequelize");
const {
  getMigrationStatus,
  rollbackLastMigration,
  runMigrations,
} = require("../src/db/migrator");

async function main() {
  try {
    if (process.argv.includes("--status")) {
      const status = await getMigrationStatus();

      console.log(`Executed migrations: ${status.executed.length}`);
      status.executed.forEach((name) => console.log(`  [x] ${name}`));

      console.log(`Pending migrations: ${status.pending.length}`);
      status.pending.forEach((name) => console.log(`  [ ] ${name}`));
      return;
    }

    if (process.argv.includes("--down")) {
      const rolledBackMigration = await rollbackLastMigration();

      if (!rolledBackMigration) {
        console.log("No executed migrations to roll back.");
        return;
      }

      console.log(`Rolled back migration: ${rolledBackMigration}`);
      return;
    }

    const appliedMigrations = await runMigrations();

    if (appliedMigrations.length === 0) {
      console.log("No pending migrations.");
      return;
    }

    console.log("Applied migrations:");
    appliedMigrations.forEach((name) => console.log(`  [x] ${name}`));
  } catch (error) {
    console.error("Migration command failed", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close().catch(() => {});
  }
}

main();
