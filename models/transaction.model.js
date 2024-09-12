const {Schema, model} = require('mongoose');// Ajoute le type Double à mongoose
const Double = require('@mongoosejs/double');

module.exports.Transaction = model('Transaction', new Schema({
    phoneSend: { type: String, required: true },
    phoneReceive: { type: String, required: true },
    detail: { type: String, required: true },
    currency: { type: String, required: true },
    amount: { type: Double, required: true },
}, {timestamps: true, versionKey: false }));