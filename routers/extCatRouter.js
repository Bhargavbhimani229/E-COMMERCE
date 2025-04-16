const { Router } = require("express");
const exCatController = require("../controllers/extraCatController")
const exbCatRouter = Router();

exbCatRouter.post("/extra", exCatController.extraCategoryCreate);

exbCatRouter.get("/delete/:id",exCatController.deleteEx);

module.exports = exbCatRouter;