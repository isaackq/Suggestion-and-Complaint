const { Sequelize } = require("sequelize");

const sequalize = new Sequelize({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT, //عشان التعارض مع الوامب
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dialect: process.env.DATABASE_DIALECT, //نوع الداتا بيز الي بدي اتصل عليها
});

module.exports = sequalize;
