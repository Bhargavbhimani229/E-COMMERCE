const { default: mongoose } = require("mongoose");

const extCatSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating:String,
  description : String,
  categoryId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    subCategoriesId:{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'SubCategory'
    } 
})

const extCatModel = mongoose.model("ExtCategory",extCatSchema);
module.exports = extCatModel;