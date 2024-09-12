const { Schema, model } = require('mongoose');

const candidatSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  votes: { type: Number, required: true },
  image: { type: String, required: true },
  video: { type: String, required: true },
},{timestamps: true});

module.exports.Candidat = model('Candidat', candidatSchema);
