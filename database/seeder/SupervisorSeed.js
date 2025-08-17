require("dotenv").config();
const Supervisor = require("../../models/Supervisor");
Supervisor.create({
  name: "isaackamel",
  email: "isaac@gmail.com",
  password: "$2b$10$2M6SENTttLffJWuucsoBhegckBStN9oqcxupSX2LhJ/kx0bxxJbgu", //hashed password , original (use it to login after run seed) : kamel12345
  phoneNumber: "0123456789",
});
