const router = require('express').Router();
const { createVote, getAllVotes, checkVote } = require('../controllers/votes.controller');
const { isLoggedIn } = require("../middleware");

router.route('/votes').get(getAllVotes);
router.route('/votes').post(createVote);
router.route('/check').post(checkVote);

module.exports = router; 