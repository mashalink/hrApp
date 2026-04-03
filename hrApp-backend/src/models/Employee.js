const { DataTypes } = require("sequelize");

function defineEmployeeModel(sequelize, schema) {
  return sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 0,
        },
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
        validate: {
          isEmail: true,
          notEmpty: true,
        },
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
      schema,
      tableName: "employees",
      timestamps: false,
    },
  );
}

module.exports = {
  defineEmployeeModel,
};
