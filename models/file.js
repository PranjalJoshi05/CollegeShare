const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    category: { type: String, required: true },
    year: { type: String, required: true },
    branch: { type: String, required: true },
    accepted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
