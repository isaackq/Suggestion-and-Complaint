const sequelize = require("../config/database");

const { DataTypes } = require("sequelize");

const Student = sequelize.define(
  "student",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { msg: "Email already exists, use another one" },
      validate: {
        isEmail: { msg: "Please enter a valid email" },
        notEmpty: { msg: "Email is required" },
        // isNull: { msg: "Email is required" },//غلط
      },
    },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // phoneNumber: {
    //   type: DataTypes.STRING(20),
    //   allowNull: false,
    //   unique: true,
    // },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Student;
