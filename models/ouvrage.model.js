const {Schema, model} = require('mongoose');
// const jwt = require('jsonwebtoken');

const ouvrageSchema = new Schema({
    titre_ouvrage: { type: String, required: true },
    description_ouvrage: { type: String, required: true },
    image_ouvrage: { type: String, required: true },
    lien_ouvrage: { type: String, required: true },
    pays_ouvrage: { type: String, required: true },
    prix_ouvrage: { type: String, required: true },
    genre_ouvrage: { type: String, required: true },
    prenom_auteur: { type: String, required: true },
    nom_auteur: { type: String, required: true },
    pays_auteur: { type: String, required: true },
    image_auteur: { type: String, required: true },
    categorie_ouvrage: { type: String, required: true },
},{timestamps: true, versionKey: false });
module.exports.Ouvrage = model('Ouvrage', ouvrageSchema);