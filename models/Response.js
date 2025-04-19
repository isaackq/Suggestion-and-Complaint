const { DataTypes } = require("sequelize");
const sequalize = require("../config/database");

const Response = sequalize.define(
  "response",
  {
    id: {
      type: DataTypes.BIGINT({ zerofill: false, unsigned: true }),
      primaryKey: true,
      autoIncrement: true,
    },
    Supervisor_id: {
      type: DataTypes.BIGINT({ zerofill: false, unsigned: true }),
      allowNull: false,
    },
    request_id: {
      type: DataTypes.BIGINT({ zerofill: false, unsigned: true }),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Response;
