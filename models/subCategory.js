const { default: mongoose } = require("mongoose");

const subCatSchema =  new mongoose.Schema({
  subCatName: String,
  subCatImage: String,
  categoryId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
})

const subCatModel = mongoose.model("SubCategory" , subCatSchema);
module.exports = subCatModel;