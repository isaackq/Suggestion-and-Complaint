require("dotenv").config();
const Supervisor = require("../../models/Supervisor");
Supervisor.create({
  name: "isaackamel",
  email: "isaackamel12345@gmail.com",
  password: "kamel12345",
  phoneNumber: "0123456789",
});
