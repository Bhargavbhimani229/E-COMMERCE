const { Router } = require("express");
const catController = require("../controllers/categoryController");
const upload = require("../middleware/categoryMidd");
const { authenticateToken, verifyAdmin } = require("../middleware/jwtToken"); // <-- aa correct import
const User = require("../models/registerShema");
const bcrypt = require("bcrypt");
require("dotenv").config();

const catRouter = Router();

catRouter.get("/register", catController.registerPage);
catRouter.post("/register", catController.registerUser);

catRouter.get("/login", catController.loginPage);
catRouter.post("/login", catController.adminLogin);


catRouter.get("/form", authenticateToken, verifyAdmin, catController.formPage);
catRouter.post("/category", authenticateToken, verifyAdmin, upload, catController.categoryCreate);

catRouter.get("/delete/:id", authenticateToken, verifyAdmin, catController.deleteCat);

catRouter.use(authenticateToken);
catRouter.get("/table", catController.tablePage);

catRouter.get("/admin", catController.homePage);
catRouter.get("/", authenticateToken, catController.flipkartPage);

catRouter.get("/singalPage/:id", catController.singalPage);

catRouter.get("/logOut", catController.logOut);

catRouter.get("/allSubCat/:id", catController.allSubCat);

module.exports = catRouter;
