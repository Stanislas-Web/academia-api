const router = require('express').Router();
const { createTransacademia, getAllTransacademia, updateTransacademia, updatefetcSTDTAC } = require('../controllers/transacademia.controller');
const { isLoggedIn } = require("../middleware");

router.route('/transacademia').get(getAllTransacademia);
router.route('/transacademia').post(createTransacademia);
router.route('/transacademiaupdate').post(updateTransacademia);
router.route('/transacademiastdtac').post(updatefetcSTDTAC);
updatefetcSTDTAC


module.exports = router; 