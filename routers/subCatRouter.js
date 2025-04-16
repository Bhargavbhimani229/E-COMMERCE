const { Router } = require("express");
const subCatController = require("../controllers/subCatConroller")
const subCatRouter = Router();

subCatRouter.post("/subcategory", subCatController.subcategoryCreate);

subCatRouter.get("/delete/:id",subCatController.deleteSub);


module.exports = subCatRouter;