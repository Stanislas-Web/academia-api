
const { Ouvrage } = require("../models/ouvrage.model");

module.exports.createOuvrage = async (req, res) => {
  const {
    titre_ouvrage,
    description_ouvrage,
    image_ouvrage,
    lien_ouvrage,
    pays_ouvrage,
    prix_ouvrage,
    genre_ouvrage,
    prenom_auteur,
    nom_auteur,
    pays_auteur,
    image_auteur,
    categorie_ouvrage,
  } = req.body;
  const ouvrage = new Ouvrage({
    titre_ouvrage: titre_ouvrage,
    description_ouvrage: description_ouvrage,
    image_ouvrage: image_ouvrage,
    lien_ouvrage: lien_ouvrage,
    pays_ouvrage: pays_ouvrage,
    prix_ouvrage: prix_ouvrage,
    genre_ouvrage: genre_ouvrage,
    prenom_auteur: prenom_auteur,
    nom_auteur: nom_auteur,
    pays_auteur: pays_auteur,
    image_auteur: image_auteur,
    categorie_ouvrage: categorie_ouvrage,
  });

  const result = await ouvrage.save();

  return res.status(200).send({
    message: "Save ouvrage",
    data: result,
  });
};

module.exports.getAllOuvrage = async (req, res) => {
  const result = await Ouvrage.find();
  return res.status(200).send(result);
};
