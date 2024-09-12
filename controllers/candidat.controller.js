
const { Candidat } = require("../models/candidat.model");

module.exports.createCandidat = async (req, res) => {
  const {
    title,
    description,
    votes,
    image,
    video
  } = req.body;



  const candidat = new Candidat({
    title: title,
    description: description,
    votes: votes,
    image: image,
    video: video
  });

  const result = await candidat.save();

  return res.status(200).send({
    message: "Save Candidat",
    data: result,
  });
};

module.exports.getAllCandidats = async (req, res) => {
  try {
    const result = await Candidat.find().sort({ votes: -1 }); // Sort by votes in descending order

    return res.status(200).send({
      message: "get all candidats",
      data: result,
    });
  } catch (error) {
    console.error('Error retrieving candidats:', error.message);
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
