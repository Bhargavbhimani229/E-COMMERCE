const { Router } = require("express");
const exCatController = require("../controllers/extraCatController");
const upload = require("../middleware/categoryMidd");
const exbCatRouter = Router();

exbCatRouter.post("/extra",upload, exCatController.extraCategoryCreate);

exbCatRouter.get("/delete/:id",exCatController.deleteEx);

module.exports = exbCatRouter;