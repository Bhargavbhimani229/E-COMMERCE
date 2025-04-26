require('dotenv').config();
const express = require("express");
const db = require("./configs/database");
const passport = require("passport");
const session = require("express-session");
const isAuth = require("./middleware/isAuth");
const bcrypt = require("bcrypt");
const port = 8095;

const app = express();
app.use("/uploads", express.static(__dirname + "/uploads"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.static("public"));
app.use("/", require("./routers/index"));

app.listen(port, async () => {
  try {
    await db();
    console.log(`Server running → http://localhost:${port}`);
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
});
