const { param, body, validationResult } = require("express-validator");
const requestsController = require("../controller/requestsController");
const DashboardController = require("../controller/DashboardController");
const SupervisorController = require("../controller/SupervisorController");
const ResponeController = require("../controller/ResponeController");
const { guest } = require("../middlewares/guest");
const { authenticate } = require("../middlewares/authenticate");
const {
  showlogin,
  login,
  logout,
} = require("../controller/Auth/AuthController");
const { Router } = require("express");
const Supervisors = require("../models/Supervisor");
const Request = require("../models/Request");
const Student = require("../models/Student");
const router = require("express").Router();

//login and logout Routes
router.get("/login", guest, showlogin);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .custom(async (value, { req }) => {
        if (req.session.guard === "supervisor") {
          return await Supervisors.count({ where: { email: value } }).then(
            (count) => {
              if (count == 0) return Promise.reject("Email is not registerd");
            }
          );
        }
      }),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  guest,
  login
);
router.get("/logout", authenticate, logout);
//////////////

//Dashboard Routes
router.get("/", authenticate, DashboardController.home);
////////////

//Supervisor Routes
router.get("/supervisors", authenticate, SupervisorController.index);
router.post(
  "/supervisors",
  body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .custom((value) => {
      return Supervisors.count({ where: { email: value } }).then((count) => {
        if (count == 1)
          return Promise.reject("This Email is regestard use onother one");
      });
    }),
  SupervisorController.store
);
router.get("/supervisors/create", authenticate, SupervisorController.create);
router.delete("/supervisors/:id", authenticate, SupervisorController.destroy);
/////////////

//Request Routes
router.get("/requests", authenticate, requestsController.index);
router.post(
  "/requests",
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 255 })
      .withMessage("Title must be at most 255 characters"),
    body("message")
      .notEmpty()
      .withMessage("Message is required")
      .isLength({ max: 1000 })
      .withMessage("Message must be at most 1000 characters"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid")
      .custom((email) => {
        return Student.count({ where: { email: email } }).then((count) => {
          if (count > 0)
            return Promise.reject("You have already Submeted a request");
        });
      }),
    body("student_id")
      .notEmpty()
      .withMessage("Student ID is required")
      .isInt({ gt: 0 })
      .withMessage("Student ID must be a positive integer")
      .custom((id) => {
        return Student.count({ where: { id: id } }).then((count) => {
          if (count > 0)
            return Promise.reject("Student already Submeted a request");
        });
      }),
  ],
  guest,//عشان المشرف ميعملش طلب من داخل النظام 
  requestsController.store
);
router.get("/requests/create", requestsController.create);
router.get("/request/search", requestsController.searchRequsetshow);
router.post(
  "/request/search",
  [
    body("id")
      .notEmpty()
      .withMessage("ID is required")
      .isInt({ gt: 0 })
      .withMessage("ID must be a positive integer")
      .trim()
      .custom((r) => {
        return Request.count({ where: { student_id: r } }).then((count) => {
          if (count == 0) return Promise.reject("Request is not found");
        });
      }),
  ],
  requestsController.searchRequset
);
//////////////

// Response Routes
router.post(
  "/responses",
  [
    body("content")
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ max: 1000 })
      .withMessage("Content must be at most 1000 characters"),
  ],
  authenticate,
  ResponeController.store
);
router.get("/closedRequests", authenticate, ResponeController.closedIndex);
//////////////
module.exports = router;
