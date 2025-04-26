const CatModel = require("../models/catSchema");
const extCatModel = require("../models/extraCategory");
const registerModel = require("../models/registerShema");
const subCatModel = require("../models/subCategory");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const fs = require("fs");
require("dotenv").config();

module.exports.homePage = (req, res) => {
  return res.render("index");
};

module.exports.registerPage = (req, res) => {
  return res.render("pages/register");
};

module.exports.loginPage = (req, res) => {
  return res.render("pages/login");
};

module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await registerModel.findOne({ email });

    if (!admin) {
      return res.render("pages/login", { error: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.render("pages/login", { error: "Incorrect password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    });
    console.log("Admin logged in successfully!");
    return res.redirect("index");
  } catch (error) {
    console.log(error);
    return res.render("index");
  }
};

module.exports.registerUser = async (req, res) => {
  try {
    let hashPwd = await bcrypt.hash(req.body.password, 10);
    await registerModel.create({
      ...req.body,
      password: hashPwd,
      role: "admin", 
    });
    console.log("Admin created successfully!");
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.render("pages/register");
  }
};

module.exports.tablePage = (req, res) => {
  return res.render("pages/tables");
};

module.exports.formPage = async (req, res) => {
  try {
    const categories = await CatModel.find();
    const subcategories = await subCatModel.find().populate("categoryId");
    const extracategories = await extCatModel
      .find()
      .populate("categoryId")
      .populate("subCategoriesId");
    return res.render("pages/form", {
      categories,
      subcategories,
      extracategories,
    });
  } catch (error) {
    console.log("Error loading form:", error.message);
    return res.render("pages/form", {
      categories: [],
      subcategories: [],
      extracategories: [],
    });
  }
};


module.exports.categoryCreate = async (req, res) => {
  try {
    await CatModel.create({ ...req.body, image: req.file.path });

    const categories = await CatModel.find();
    const subcategories = await subCatModel.find().populate("categoryId");
    const extracategories = await extCatModel
      .find({})
      .populate("categoryId")
      .populate("subCategoriesId");

    return res.render("pages/form", {
      categories,
      subcategories,
      extracategories,
    });
  } catch (error) {
    console.log(error.message);
    return res.render("pages/form", {
      categories: [],
      subcategories: [],
      extracategories: [],
    });
  }
};

module.exports.deleteCat = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCat = await CatModel.findByIdAndDelete(id);
    const subcategories = await subCatModel.find({ categoryId: id });
    const extracategories = await extCatModel.find({ categoryId: id });
    for (let sub of subcategories) {
      if (sub.subCatImage && fs.existsSync(sub.subCatImage)) {
        fs.unlinkSync(sub.subCatImage);
      }
    }

    for (let ext of extracategories) {
      if (ext.image && fs.existsSync(ext.image)) {
        fs.unlinkSync(ext.image);
      }
    }
    await subCatModel.deleteMany({ categoryId: id });
    await extCatModel.deleteMany({ categoryId: id });
    if (deleteCat && deleteCat.image && fs.existsSync(deleteCat.image)) {
      fs.unlinkSync(deleteCat.image);
    }

    return res.redirect("/form");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/form");
  }
};



module.exports.flipkartPage = async (req, res) => {
  try {
    const categories = await CatModel.find();
    const subcategories = await subCatModel.find().populate("categoryId");
    const extracategories = await extCatModel
      .find()
      .populate("categoryId")
      .populate("subCategoriesId");

    return res.render("pages/homepage", {
      categories,
      subcategories,
      extracategories,
      user: req.session.user || null,
    });
  } catch (error) {
    console.log("Error loading homepage:", error.message);
    return res.render("pages/homepage", {
      categories: [],
      subcategories: [],
      extracategories: [],
    });
  }
};



module.exports.singalPage = async (req, res) => {
  try {
    const extraCategory = await extCatModel.findById(req.params.id);
    if (!extraCategory) {
      return res.status(404).send("Extra Category not found");
    }
    return res.render("pages/singalPage", { extraCategory });
  } catch (error) {
    console.log("Error loading single page:", error.message);
    return res.status(500).send("Server Error");
  }
};

module.exports.logOut = (req, res) => {
  res.clearCookie("token");
    res.redirect("/login");
  };



module.exports.allSubCat = async (req, res) => {
  try {
    const subCatId = req.params.id;
    const extraCategoryList = await extCatModel.find({ subCategoriesId: subCatId });

    return res.render("pages/allSubCat", {
      extraCategories: extraCategoryList,
    });
  } catch (error) {
    console.log("Error loading subcategory page:", error.message);
    return res.status(500).send("Server Error");
  }
}


