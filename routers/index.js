const { Router } = require("express");

const catRouter = require("./categoryRouter");
const subRouter = require("./subCatRouter");
const extRouter = require("./extCatRouter");
const forgotRouter = require("./forgotRouter")
const indexRouter = Router();

indexRouter.use("/forgot",forgotRouter);
indexRouter.use("/",catRouter);

indexRouter.use("/sub",subRouter);

indexRouter.use("/ext",extRouter);


module.exports = indexRouter;
