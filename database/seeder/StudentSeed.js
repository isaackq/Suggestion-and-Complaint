require("dotenv").config();
const Student = require("../../models/Student");
Student.create({
  name: "isaackamel",
  email: "isaac@gmail.com",
  password: "kamel12345",
  phoneNumber: "0123456789",
});
