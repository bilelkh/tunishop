const mongoose = require("mongoose");
const Category = require("../models/category").schema;
const subCategory = require("../models/subCategory").schema;

const Schema = mongoose.Schema;

const adSchema = new Schema(
  {
    userId: { type: String, required: false },
    title: { type: String, required: false },
    delegation: { type: Object, required: false },
    governorate: { type: Object, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: false },
    subCategory: subCategory,
    category: Category,
    filesURL :  [String],
    address :{ type: String, required: false },
    latitude :{ type: Number, required: false },
    longitude :  { type: Number, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ad", adSchema);
