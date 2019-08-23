const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adSchema = new Schema({
    userId: { type: String, required: false },
    title: { type: String, required: false },
    category: { type: String, required: false },
    subCategory: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Ad', adSchema);