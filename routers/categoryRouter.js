const { Router } = require("express");
const catController = require("../controllers/categoryController");
const upload = require("../middleware/categoryMidd");
const { protect, adminOnly } = require("../middleware/jwtToken");
const User = require("../models/registerShema")
require("dotenv").config();

const catRouter = Router();

catRouter.get("/admin", catController.homePage);
catRouter.get("/register", catController.registerPage);
catRouter.post("/register", catController.registerUser);


catRouter.get("/login", catController.loginPage);
catRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return res.redirect("/");

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

catRouter.get("/table", catController.tablePage);

catRouter.get("/form", protect, adminOnly, catController.formPage);
catRouter.post("/category", protect, adminOnly, upload, catController.categoryCreate);

catRouter.get("/delete/:id", protect, adminOnly, catController.deleteCat);

catRouter.get("/", protect,catController.flipkartPage);

catRouter.get("/singalPage/:id", catController.singalPage);


catRouter.get("/logOut", catController.logOut);

catRouter.get("/allSubCat/:id", catController.allSubCat);

module.exports = catRouter;