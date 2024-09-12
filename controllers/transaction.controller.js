
const { Transaction } = require("../models/transaction.model");




module.exports.createTransaction = async (req, res) => {
  const {
    detail,
    phoneSend,
    phoneReceive,
    currency,
    amount,
  } = req.body;


  

  const transaction = new Transaction({
    detail: detail,
    phoneSend: phoneSend,
    phoneReceive: phoneReceive,
    currency: currency,
    amount: amount
  });

  const result = await transaction.save();

  return res.status(200).send({
    message: "Save transaction",
    data: result,
  });
};




module.exports.getAllTransactionsByNumber = async (req, res) => {
  const result = await Transaction.find();
  const number = req.params.number;

  const fetchTransactionByNumber = result.filter((e)=> e.phoneSend === number || e.phoneReceive === number);

  return res.status(200).send({
    message: "get all transactions",
    data: fetchTransactionByNumber,
  });
};


