const express = require("express");
const db = require("./configs/database");
const passport = require("passport");
const session = require("express-session");
const { userLocalsData } = require("./middleware/passport");
const isAuth = require("./middleware/isAuth")
const app = express();
const port = 8090;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false,
  cookie : {maxAge : 1000 * 60 * 60}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(isAuth);

app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/", require("./routers/index"));

app.listen(port, (error) => {
  if (!error) {
    db();
    console.log("This port is run \nhttp://localhost:" + port);
  }
});
