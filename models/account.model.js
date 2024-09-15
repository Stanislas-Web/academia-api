const { Schema, model } = require('mongoose');

const AccountSchema = new Schema(
  {
    phoneWhatsapp: { type: String, required: true },
    phoneAccount: { type: String, required: true },
    nom: { type: String, required: true },
    postnom: { type: String, required: true },
    prenom: { type: String, required: true },
    universite: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    // expires: 1800000,
    expires: 1000 // 30 minutes en millisecondes
  }
);

module.exports.Account = model('Account', AccountSchema);
