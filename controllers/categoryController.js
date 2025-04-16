const CatModel = require("../models/catSchema");
const extCatModel = require("../models/extraCategory");
const registerModel = require("../models/registerShema");
const subCatModel = require("../models/subCategory");
const fs = require("fs");


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
    console.log(req.body.password);

    let { password, confirmPw } = req.body;
    if (password === confirmPw) {
      let user = await registerModel.create(req.body);
      return res.render("pages/login", { user });
    } else {
      console.log("Password & Confirm Password should be same!");
      return res.render("pages/register", req.body);
    }
  } catch (error) {
    console.log(error.message);
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
   await subCatModel.deleteMany({categoryId : id})
   await extCatModel.deleteMany({categoryId : id , subCategoriesId : id})
    fs.unlinkSync(deleteCat.image);
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


module.exports.singalPage = (req,res) => {
  return res.render("pages/singalPage");
}
