const { default: mongoose } = require("mongoose");

const registerSchema =  new mongoose.Schema({
  email : String,
  username : String ,
  password : String,
},{timestamps : true})

const registerModel = mongoose.model("registerUser" , registerSchema)
module.exports = registerModel;