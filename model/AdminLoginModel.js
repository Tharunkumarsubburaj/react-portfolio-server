const mongoose = require('mongoose');

const AdminLoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    emailid: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminLogin', AdminLoginSchema);