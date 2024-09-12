const router = require('express').Router();
const { createOrder, getAllOrderByUserId } = require('../controllers/order.controller');
const { isLoggedIn } = require("../middleware");

router.route('/orders/:userId').get(isLoggedIn,getAllOrderByUserId);
router.route('/orders').post(isLoggedIn,createOrder);

module.exports = router; 