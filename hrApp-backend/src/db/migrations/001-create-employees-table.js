async function tableExists(queryInterface, tableReference) {
  try {
    await queryInterface.describeTable(tableReference);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  async up({ DataTypes, queryInterface, schema, transaction }) {
    const tableReference = {
      schema,
      tableName: "employees",
    };

    if (await tableExists(queryInterface, tableReference)) {
      return;
    }

    await queryInterface.createTable(
      tableReference,
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "",
        },
        salary: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "",
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        animal: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "",
        },
        startDate: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "",
        },
        department: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "",
        },
        skills: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
          defaultValue: [],
        },
      },
      {
        transaction,
      },
    );
  },

  async down({ queryInterface, schema, transaction }) {
    const tableReference = {
      schema,
      tableName: "employees",
    };

    if (!(await tableExists(queryInterface, tableReference))) {
      return;
    }

    await queryInterface.dropTable(tableReference, { transaction });
  },
};
