const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // عدّل المسار حسب إعدادك

const Request = sequelize.define(
  "request",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Complaint", "Suggestion"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Open", "Closed"),
      allowNull: false,
      defaultValue: "Open",
    },
    image: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    urgent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    closed_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // response: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    // },
  },
  {
    timestamps: true, // يضيف createdAt و updatedAt تلقائيًا
    paranoid: true, // يضيف deletedAt تلقائيًا
  }
);

module.exports = Request;
