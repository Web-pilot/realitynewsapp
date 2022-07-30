if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
// const session = require("express-session");
// const passport = require("passport");
// const flash = require("express-flash");
const favicon = require("express-favicon");
const path = require("path");

//Routes

const authenticationRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
// const generalRoute = require("./routes/generalRoute");
const newsRoute = require("./routes/news");

const app = express();
// app.use(flash());
// //passport
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: false,
//     failureFlash: true,
//   })
// );
// app.use(passport.session());

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/images"));
// app.use(favicon(__dirname + "/public/img/favicon.ico"));

//Routes
app.use("/api/authentication", authenticationRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/news", newsRoute);
// app.use("/", generalRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "build", "public", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`App is listening at http://localhost:${port}`)
);
