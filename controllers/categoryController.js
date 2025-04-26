const CatModel = require("../models/catSchema");
const extCatModel = require("../models/extraCategory");
const registerModel = require("../models/registerShema");
const subCatModel = require("../models/subCategory");
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

module.exports.registerUser = async (req, res) => {
  try {
    let { password, confirmPw, email } = req.body;
    if (password === confirmPw) {
      let user = await registerModel.create(req.body);

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      return res.redirect("/");
    } else {
      console.log("Password & Confirm Password should be same!");
      return res.render("pages/register", { user: null });
    }
  } catch (error) {
    console.log(error.message);
    return res.render("pages/register", { user: null });
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
  res.clearCookie('token');
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/login");
  });
}


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


