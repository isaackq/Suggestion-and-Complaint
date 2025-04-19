require("dotenv").config();
const Student = require("../../models/Student");
Student.create({
  name: "isaackamel",
  email: "isaackamel12345@gmail.com",
  password: "kamel12345",
  phoneNumber: "0123456789",
});
