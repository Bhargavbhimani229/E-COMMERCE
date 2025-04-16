const { Router } = require("express");

const catRouter = require("./categoryRouter");
const subRouter = require("./subCatRouter")
const extRouter = require("./extCatRouter")
const indexRouter = Router();

indexRouter.use("/",catRouter);

indexRouter.use("/sub",subRouter);

indexRouter.use("/ext",extRouter);

module.exports = indexRouter;
