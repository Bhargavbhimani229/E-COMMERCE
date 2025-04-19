const { Router } = require("express");
const forgotController = require("../controllers/forgotPw");

const forgotRouter = Router();

forgotRouter.get("/verifayEmail",forgotController.verifayEmail)

module.exports = forgotRouter;