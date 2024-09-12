const { Schema, model } = require('mongoose');

const votesSchema = new Schema({
  phoneWhatsapp: { type: String, required: true },
  candidatName: { type: String, required: true },
},{timestamps: true });

module.exports.Votes = model('Votes', votesSchema);
