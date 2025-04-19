const { validationResult } = require("express-validator");
const Request = require("../models/Request");
const Response = require("../models/Response");
const Supervisors = require("../models/Supervisor");
const Mailer = require("../vendor/Mailer/Mailer");
const Student = require("../models/Student");

exports.index = () => {};

exports.store = async (req, res, next) => {
  try {
    const validator = validationResult(req);
    if (validator.isEmpty()) {
      const request = await Request.findOne({
        where: { id: req.body.request_id }/*,
        include: {
          model: Student,
          as: "student",
          attributes: ["email"],
        },*/
      });
      const student = await Student.findByPk(request.student_id);
      console.log(student);
      if (student) {
        await Mailer.instance
          .to(`${student.email}`) //student email
          .from("isaackamell2345@gmail.com") //system email
          .subject("Reset Password Request")
          .text(`${req.body.content}`)
          .message(`${req.body.content}`)
          .send();
        console.log("Email SeNT");
      } else {
        res.send("Student Not Found");
      }

      await Response.create({
        ...req.body,
        Supervisor_id: req.session.user.id,
      });
      await request.update({ status: "closed", closed_date: Date.now() }); //status closed_date

      //Email Send Function

      res.with("req_id", req.body.request_id).redirect("/cms/requests");
    } else {
      res
        .with("old", req.body)
        .with("errors", validator.array())
        .redirect("/cms/requests");
    }
  } catch (error) {
    error.message = "Something went wrong";
    error.status = 505;
    next(error);
  }
};

exports.closedIndex = async (req, res, next) => {
  try {
    const response = await Response.findAll({
      include: [
        {
          model: Request,
          as: "request",
        },
        {
          model: Supervisors,
          as: "supervisor",
        },
      ],
    });
    // res.send({ data: response });
    return res.render("layouts/requests/closedrequests", { data: response });
  } catch (error) {
    error.message = "Something went wrong";
    error.status = 505;
    next(error);
  }
};
