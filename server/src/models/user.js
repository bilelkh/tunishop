const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    adresse: { type: String, required: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    authorization  : String
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;