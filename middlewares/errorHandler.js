exports.errorHandler = (err, req, res, next) => {
  if (error.status === 505) {
    return res.status(error.status || 505).render("layouts/errors/505-error", {
      error: error.message || "Internal Server Error",
    });
  } else if (error.status === 500) {
    return res.status(error.status || 500).render("layouts/errors/500-error", {
      error: error.message || "Internal Server Error",
    });
  } else if (error.status === 403) {
    return res.status(error.status || 403).render("layouts/errors/403-error", {
      error: error.message || "Forbidden",
    });
  } else {
    console.log(error);

    return res
      .status(error.status || 507)
      .render("layouts/errors/general-error", {
        error: "Sorry, something went wrong. Please try again later.",
        status: error.status || 507,
      });
  }
};
