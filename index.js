const express = require("express");
const db = require("./configs/database");
const app = express();
const port = 8090;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/", require("./routers/index"));

app.listen(port, (error) => {
  if (!error) {
    db();
    console.log("This port is run \nhttp://localhost:" + port);
  }
});
