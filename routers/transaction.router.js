const router = require('express').Router();
const { createTransaction, getAllTransactionsByNumber} = require('../controllers/transaction.controller');

router.route('/transactions').post(createTransaction);
router.route('/transactions/:number').get(getAllTransactionsByNumber);

module.exports = router; 