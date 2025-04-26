require('dotenv').config();
const express = require("express");
const db = require("./configs/database");
const passport = require("passport");
const session = require("express-session");
const isAuth = require("./middleware/isAuth");
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 8090;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Remove global protect middleware
// app.use(require('./middleware/jwtToken').protect);

app.use(session({
  secret: process.env.JWT_SECRET || "fallbacksecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(isAuth);

app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/", require("./routers/index"));

app.listen(port, async () => {
  try {
    await db();
    console.log(`Server running → http://localhost:${port}`);
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
});
