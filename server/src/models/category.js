const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    icon: { type: String, required: false },
    title: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);