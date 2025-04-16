const { default: mongoose, model } = require("mongoose");

const catSchema = new mongoose.Schema({
  name : String,
  image : String,
})

const CatModel = mongoose.model("Category",catSchema);
module.exports = CatModel;
