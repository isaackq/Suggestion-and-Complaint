// Middleware to handle session errors`
exports.sessionErorrs = (req, res, next) => {
  if ("flashed" in req.session && typeof req.session.flashed ==="object") {
    res.locals= req.session.flashed;
    req.session.flashed =undefined;
  }
  next();
};
