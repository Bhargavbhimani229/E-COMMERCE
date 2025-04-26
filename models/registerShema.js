const { default: mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

const adminModel = mongoose.model("adminModel", adminSchema);
module.exports = adminModel;