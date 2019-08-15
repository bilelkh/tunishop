const Category = require("../models/category").schema;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    title: { type: String, required: false },
    category: Category
}, { timestamps: true });

module.exports = mongoose.model('SubCategory', SubCategorySchema);