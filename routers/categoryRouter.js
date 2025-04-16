const { Router } = require("express");
const catController = require("../controllers/categoryController");
const upload = require("../middleware/categoryMidd");

const catRouter = Router();

catRouter.get("/admin",catController.homePage);

catRouter.get("/register",catController.registerPage);
catRouter.post("/register",catController.registerUser);

catRouter.get("/login",catController.loginPage);

catRouter.get("/table",catController.tablePage);

catRouter.get("/form",catController.formPage);
catRouter.post("/category",upload,catController.categoryCreate);

catRouter.get("/delete/:id",catController.deleteCat);


catRouter.get("/",catController.flipkartPage);

catRouter.get("/singalPage/:id",catController.singalPage);
module.exports = catRouter;