const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema(
  {
    title: {    type: String,   required: false  }
  },
  { timestamps: true }
);

module.exports = mongoose.model('subCategory', subCategorySchema);
