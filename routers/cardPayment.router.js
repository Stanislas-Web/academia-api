const router = require('express').Router();
const { cardPayment} = require('../controllers/cardPayment.controller');
const { isLoggedIn } = require("../middleware");

router.route('/cardpayment').post(cardPayment);

module.exports = router; 