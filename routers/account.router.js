const router = require('express').Router();
const { createAccount } = require('../controllers/account.controller');
const { isLoggedIn } = require("../middleware");

router.route('/createAccount').post(createAccount);


module.exports = router; 