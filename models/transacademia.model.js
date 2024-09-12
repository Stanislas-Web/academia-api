const { Schema, model } = require('mongoose');

const transacademiaSchema = new Schema(
  {
    phoneWhatsapp: { type: String, required: true },
    phonePayment: { type: String, required: true },
    phoneAccount: { type: String, required: true },
    status: { type: String, required: true },
    stdTac: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    // expires: 1800000,
    expires: 1000 // 30 minutes en millisecondes
  }
);

module.exports.Transacademia = model('Transacademia', transacademiaSchema);
