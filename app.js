const express = require("express");
require("dotenv").config();
const AppProvider = require("./services/AppProvider");
const app = express();
const apiRouter = require("./router/api");
const webRouter = require("./router/web");
const errorRouter = require("./router/errors");
const { sessionErorrs } = require("./middlewares/session-errors");
const { withSessionHandler } = require("./middlewares/wIthSessionHandller");
const { methodOverride } = require("./middlewares/methodOverride");
const session = require("express-session");
const Student = require("./models/Student");
const multer = require("multer");

AppProvider.instance.app = app; //after singleton
AppProvider.instance.syncDatabase();

app.use(
  session({
    secret: "node", // secret used to sign the session cookie
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/storage", express.static("storage")); //for images

app.set("view engine", "ejs");
app.set("views", "views"); //يعني الواجهات موجودو في الفيوز

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage"); //wiht out slash
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({ storage: diskStorage, fileFilter: fileFilter }).single("image")
);

app.use(methodOverride);
app.use(withSessionHandler);
app.use(sessionErorrs);

app.use("/api", apiRouter);
app.use("/cms", webRouter);
app.use("/errors", errorRouter);

//General handller
app.use((error, req, res, next) => {
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
  // next(error);
});

app.use((req, res, next) => {
  res.status(404).render("layouts/errors/404-error", {
    error: "Page not found",
  });
});

// app.use((req, res, next) => {
//   res.status(404).render("layouts/errors/404-error", { error: "Page not found" });
// });

app.listen(3000, () => {
  console.log("server is running on port 3000");
  console.log("server is running on port 3000");
  console.log("server is running on port 3000");
  console.log("server is running on port 3000");
  console.log("server is running on port 3000");
});
