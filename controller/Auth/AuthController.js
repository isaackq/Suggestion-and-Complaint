const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Auth = require("../../services/Authenticate");

exports.showlogin = (req, res, next) => {
  // req.session.redirectTo = req.originalUrl;
    res.render("layouts/auth/login", { title: "log in" });
};

exports.login = async (req, res, next) => {
  req.session.guard = "supervisor";
  const validator = validationResult(req);
  if (validator.isEmpty()) {
    let result = await Auth.guard(req.session.guard).attempt(req);
    if (result) {
      res.with('guard',req.session.guard).redirect("/cms");
    } else {
      return res
        .with("errors", [{ msg: "Wrong credentials" }])
        .with("old", req.body)
        .redirect(`/cms/login`);
    }
  } else {
    return res
      .with("errors", validator.array())
      .with("old", req.body)
      .redirect(`/cms/login`);
  }
};
exports.logout = (req, res, next) => {
  //Auth.guard('Student').logout();
  req.session.user = undefined;
  req.session.isAuthenticated = undefined;
  req.session.guard = undefined;
  res.redirect(`/cms/login`);
};
exports.forgotpassword = (req, res, next) => {};
exports.editpassword = (req, res, next) => {};
exports.updatepassword = (req, res, next) => {};
