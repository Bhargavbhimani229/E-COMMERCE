const extCatModel = require("../models/extraCategory");
const fs = require("fs");

module.exports.extraCategoryCreate = async (req, res) => {
  try {
    const extraCategory = await extCatModel.create(req.body);
    console.log("Extra Category created:", extraCategory);
  
    return res.redirect("/form");
  } catch (error) {
    console.log("Extra Category creation failed:", error.message);
    return res.redirect("/form");
  }
};

module.exports.deleteEx = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEx = await extCatModel.findByIdAndDelete(id);
    fs.unlinkSync(deleteEx.image);
    return res.redirect("/form");
  } catch (error) {
    console.log(error.message);
  }
};
