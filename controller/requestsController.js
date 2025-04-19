const { validationResult } = require("express-validator");
const Request = require("../models/Request");
const Response = require("../models/Response");
const { guard } = require("../services/Authenticate");
const Student = require("../models/Student");

exports.create = (req, res, next) => {
  try {
    // throw new Error("test error"); // Simulate an error for testing
    res.render("layouts/requests/sendRequest", { title: "Send Request" });
  } catch (error) {
    error.message = "An error occurred while loading the page.";
    error.status = 500;
    next(error); // Pass the error to the general error handler
  }
};

exports.index = async (req, res, next) => {
  try {
    const data = await Request.findAll();
    if (data && data.length > 0) {
      return res.render("layouts/requests/requests", {
        title: "Requests",
        data: data,
      });
    } else {
      return res.render("layouts/requests/requests", {
        title: "Requests",
        error: "No requests found.",
      });
    }
    // return res.send({ error: "No requests found." });
  } catch (error) {
    error.message = "An error occurred while fetching requests.";
    error.status = 500;
    next(error);
    // res
    //   .status(500)
    //   .send({ error: "An error occurred while fetching requests." });
  }
};

exports.store = async (req, res, next) => {
  try {
    // req.session.redirectTo = req.originalUrl;
    const validator = validationResult(req);
    if (validator.isEmpty()) {
      await Student.create({
        id: req.body.student_id,
        email: req.body.email,
        name: req.body.name,
      });
      await Request.create({
        ...req.body,
        urgent: req.body.urgent === "on",
        image: req.file ? `\\${req.file.path}` : "",
      });
      res.with("success", true).redirect("/cms/requests/create");
    } else {
      res
        .with("old", req.body)
        .with("errors", validator.array())
        .redirect("/cms/requests/create");
    }
  } catch (error) {
    console.log(error);

    error.message = "An error occurred while creating the request.";
    error.status = 500;
    next(error);
    // res.status(500).send({
    //   error: error.message || "An error occurred while creating the request.",
    // });
  }
};

exports.searchRequsetshow = async (req, res, next) => {
  try {
    // req.session.redirectTo = req.originalUrl;
    res.render("layouts/requests/searchRequest", {
      title: "Search Request",
      guard: req.session.guard,
    });
  } catch (error) {
    error.message = "An error occurred while loading the page.";
    error.status = 500;
    next(error);
    // res
    //   .status(500)
    //   .send({ error: "An error occurred while loading the page." });
  }
};

exports.searchRequset = async (req, res, next) => {
  try {
    const validator = validationResult(req);
    if (validator.isEmpty()) {
      const request = await Request.findOne({
        where: { student_id: req.body.id },
        include: [
          {
            model: Response,
            as: "response",
          },
        ],
      });
      if (request) {
        res.with("request", request).redirect("/cms/request/search");
      } else {
        //هالك التحقق بكون قبل الدخول
        res.send({ error: "No request found" });
      }
    } else {
      res
        .with("old", req.body)
        .with("errors", validator.array())
        .redirect("/cms/request/search");
    }
  } catch (error) {
    error.message = "An error occurred while searching for the request.";
    error.status = 500;
    next(error);
    // console.error("Error searching for request:", error);
    // res
    //   .status(500)
    //   .send({ error: "An error occurred while searching for the request." });
  }
};
