
const { Votes } = require("../models/votes.model");
const { Candidat } = require("../models/candidat.model");
const moment = require('moment');


module.exports.checkVote = async (req, res) => {
  const { phoneWhatsapp } = req.body;


  try {
    const lastVote = await Votes.findOne({ phoneWhatsapp, createdAt: { $gte: moment().subtract(24, 'hours').toDate() } });

    if (lastVote) {
      return res.status(200).send({
        message: "Désolé, Vous avez le droit de voter une seule fois par période de 24 heures.🥺🥵",
      });
    } else {
      return res.status(200).send({
        message: "Good Job!",
      });

    }

  } catch (error) {
    console.error('Error creating vote:', error.message);
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


module.exports.createVote = async (req, res) => {
  const { phoneWhatsapp, candidatName } = req.body;

  if (candidatName.startsWith("Votez")) {
    let candidateCheck = candidatName.split(" ");

    const fetchAllCandidate = await Candidat.find();



    const objectCandidate = fetchAllCandidate.find((candidate) => candidate.title.includes(candidateCheck[1]));

    console.log("candidat" + objectCandidate);

    const candidat = await Candidat.findOne({ title: objectCandidate.title });

    if (!candidat) {
      return res.status(200).send({
        message: "Je ne comprends pas ce que vous dites",
      });
    }

    try {
      const lastVote = await Votes.findOne({ phoneWhatsapp, createdAt: { $gte: moment().subtract(24, 'hours').toDate() } });

      if (lastVote) {
        return res.status(200).send({
          message: "Désolé, Vous avez le droit de voter une seule fois par période de 24 heures.🥺🥵",
        });
      }




      const update = { votes: candidat.votes + 1 };
      const resultCandidat = await Candidat.updateOne({ title: objectCandidate.title }, update);


      const vote = new Votes({
        phoneWhatsapp: phoneWhatsapp,
        candidatName: objectCandidate.title,
      });

      const result = await vote.save();

      return res.status(200).send({
        message: "Le vote a été effectué avec succès. 🥳👍🏽👌🏻",
        data: result,
      });
    } catch (error) {
      console.error('Error creating vote:', error.message);
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }

  } else {






    const candidat = await Candidat.findOne({ title: candidatName });

    if (!candidat) {
      return res.status(200).send({
        message: "Je ne comprends pas ce que vous dites",
      });
    }

    try {
      const lastVote = await Votes.findOne({ phoneWhatsapp, createdAt: { $gte: moment().subtract(24, 'hours').toDate() } });

      if (lastVote) {
        return res.status(200).send({
          message: "Désolé, Vous avez le droit de voter une seule fois par période de 24 heures.🥺🥵",
        });
      }




      const update = { votes: candidat.votes + 1 };
      const resultCandidat = await Candidat.updateOne({ title: candidatName }, update);


      const vote = new Votes({
        phoneWhatsapp: phoneWhatsapp,
        candidatName: objectCandidate.title,
      });

      const result = await vote.save();

      return res.status(200).send({
        message: "Le vote a été effectué avec succès. 🥳👍🏽👌🏻",
        data: result,
      });
    } catch (error) {
      console.error('Error creating vote:', error.message);
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }



  }

};

module.exports.getAllVotes = async (req, res) => {
  const result = await Votes.find();

  return res.status(200).send({
    message: "get all Votes",
    data: result,
  });
};
