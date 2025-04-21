const { Router } = require("express");
const catController = require("../controllers/categoryController");
const upload = require("../middleware/categoryMidd");
const { userPassportAuth } = require("../middleware/passport");
const isAuth = require("../middleware/isAuth");
const passport = require("passport");

const catRouter = Router();

catRouter.get("/admin",catController.homePage);

catRouter.get("/register",catController.registerPage);
catRouter.post("/register",catController.registerUser);


catRouter.get("/login",catController.loginPage);
catRouter.post("/login", passport.authenticate("local", {
    failureRedirect: "/login"
  }), (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  });

catRouter.get("/table",catController.tablePage);

catRouter.get("/form",isAuth,catController.formPage);
catRouter.post("/category",upload,catController.categoryCreate);

catRouter.get("/delete/:id",catController.deleteCat);

catRouter.use(userPassportAuth);
catRouter.get("/",catController.flipkartPage);

catRouter.get("/singalPage/:id",catController.singalPage);


catRouter.get("/logOut",catController.logOut);

catRouter.get("/allSubCat/:id",catController.allSubCat);

module.exports = catRouter;