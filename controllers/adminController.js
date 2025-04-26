const categoryModel = require("../models/catSchema");
const subCategoryModel = require("../models/subCategory");
const extCategoryModel = require("../models/extraCategory");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminModel = require("../models/registerShema");



// Load admin dashboard page
module.exports.adminDashboard = (req, res) => {
  return res.render("/");
};

// Load form page
module.exports.formPage = async (req, res) => {
  try {
    const catData = await categoryModel.find({});
    const selectedCategoryId = req.query.categoryId || null;

    const subCatData = selectedCategoryId
      ? await subCategoryModel
          .find({ categoryId: selectedCategoryId })
          .populate("categoryId", "name")
      : await subCategoryModel.find({}).populate("categoryId", "name");

    const extCatData = await extCategoryModel
      .find({})
      .populate("categoryId", "name")
      .populate("subcategoryId", "name");

    return res.render("pages/form", {
      catData,
      subCatData,
      extCatData,
      selectedCategoryId,
    });
  } catch (error) {
    console.log("Error loading form page:", error.message);
    return res.render("pages/form", {
      catData: [],
      subCatData: [],
      extCatData: [],
      selectedCategoryId: null,
    });
  }
};

// Login Page
module.exports.loginPage = (req, res) => {
  return res.render("pages/login");
};

// Register Page
module.exports.registerPage = (req, res) => {
  return res.render("pages/register");
};

// Register Admin
module.exports.registerAdmin = async (req, res) => {
  try {
    let hashPwd = await bcrypt.hash(req.body.password, 10);
    await adminModel.create({
      ...req.body,
      password: hashPwd,
      role: "admin", // set role manually
    });
    console.log("Admin created successfully!");
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.render("pages/register");
  }
};

// Admin Login
module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.render("admin/login", { error: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.render("admin/login", { error: "Incorrect password" });
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
    return res.redirect("/admin/adminDashboard");
  } catch (error) {
    console.log(error);
    return res.render("admin/login");
  }
};

// Admin Logout
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/admin/login");
};