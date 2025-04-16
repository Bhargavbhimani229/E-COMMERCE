const subCatModel = require("../models/subCategory");
const fs = require("fs");

module.exports.subcategoryCreate = async (req, res) => {
  try {
    const subcategory = await subCatModel.create(req.body);
    console.log("Subcategory created:", subcategory);
    return res.redirect("/form");
  } catch (error) {
    console.log("Subcategory creation failed:", error.message);
    return res.redirect("/form"); 
  }
};

module.exports.deleteSub = async (req, res) => {
  try {
    const { id } = req.params;
   const deleteSub = await subCatModel.findByIdAndDelete(id);
    fs.unlinkSync(deleteSub.subCatImage);
    return res.redirect("/form");
  } catch (error) {
    console.log(error.message);
  }
};

