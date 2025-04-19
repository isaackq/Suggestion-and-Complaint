const { validationResult } = require("express-validator");
const Supervisors = require("../models/Supervisor");
const bcrypt = require("bcrypt");
exports.index = async (req, res, next) => {
  console.log("isaac kamel eqdaih");

  //لما تكون ترو يعني هات الي  السوفت ديليت تبعتو نل
  let result = await Supervisors.findAll({
    paranoid: false, //يعني جيب المحذوف والمش  محذوف
    //Eager loading
    // include: [{ model: Task, as: "tasks" }], //with in laravel
  });
  res.render("layouts/supervisors/read", {
    title: "ALL Students",
    data: result,
  });
};

exports.create = (req, res) => {
  res.render("layouts/supervisors/create", { title: "Create Supervisor" });
};

exports.store = async (req, res, next) => {
  let error = validationResult(req);
  if (error.isEmpty()) {
    try {
      let result = await Supervisors.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      if (result) {
        return res
          .with("message", "Created Successfully")
          .redirect("/cms/supervisors/create");
      }
      res
        .with("errors", ["error creating supervisor"])
        .with("old", req.body) //to handle locals.errors in the view
        .redirect("/cms/supervisors/create");
    } catch (error) {
      return res
        .with(
          "error",
          Object.keys(error).length > 0
            ? error.errors[0].message
            : "Somthing went wrong"
        )
        .redirect("/cms/supervisors/create");
    }
  } else {
    res
      .with("old", req.body)
      .with("errors", error.array())
      .redirect("/cms/supervisors/create"); //لما نعمل ريداركت بنكون مسحنا كل اشي من الريسبونس
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const supervisor = await Supervisors.findByPk(req.params.id);
    if (supervisor) {
      await supervisor.destroy({ force: true });
      return res
        .with("message", "Deleted Successfully")
        .redirect("/cms/supervisors");
    } else {
      return res
        .with("error", "Somthing went wrong , try again")
        .redirect("/cms/supervisors");
      // res.status(404).send({ status: false, message: "Supervisor not found" });
    }
  } catch (error) {
    return res
      .with(
        "errors",
        Object.keys(error).length > 0
          ? error.errors[0].message
          : "Somthing went wrong"
      )
      .redirect("/cms/supervisors");
  }
};
