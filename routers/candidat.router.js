const router = require('express').Router();
const { createCandidat, getAllCandidats } = require('../controllers/candidat.controller');
const { isLoggedIn } = require("../middleware");

router.route('/candidats').get(getAllCandidats);
router.route('/candidats').post(createCandidat);

module.exports = router; 