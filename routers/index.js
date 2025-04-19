const { Router } = require("express");

const catRouter = require("./categoryRouter");
const subRouter = require("./subCatRouter");
const extRouter = require("./extCatRouter");
const forgotRouter = require("./forgotRouter")
const indexRouter = Router();

indexRouter.use("/",catRouter);

indexRouter.use("/sub",subRouter);

indexRouter.use("/ext",extRouter);

indexRouter.use("/forgot",forgotRouter);

module.exports = indexRouter;
