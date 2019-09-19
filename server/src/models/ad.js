const mongoose = require("mongoose");
const Category = require("../models/category").schema;
const subCategory = require("../models/subCategory").schema;

const Schema = mongoose.Schema;

const adSchema = new Schema(
  {
    userId: { type: String, required: false },
    title: { type: String, required: false },
    delegation: { type: String, required: false },
    governorate: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: false },
    subCategory: subCategory,
    category: Category
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ad", adSchema);
