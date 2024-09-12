
const { status } = require("express/lib/response");
const { Transacademia } = require("../models/transacademia.model");
const axios = require('axios');
const FormData = require('form-data');

module.exports.createTransacademia = async (req, res) => {
  const {
    phoneWhatsapp,
  } = req.body;

  const transacademia = new Transacademia({
    phoneWhatsapp: phoneWhatsapp,
    phonePayment: "default",
    phoneAccount: "default",
    status: "pending",
    stdTac: "default",
  });

  const result = await transacademia.save();

  return res.status(201).send({
    message: "Save Trans Academia datas successfully",
    data: result,
  });
};



module.exports.updateTransacademia = async (req, res) => {
  const {
    phoneWhatsapp,
    phone,
  } = req.body;

  const transacademia = await Transacademia.findOne({ phoneWhatsapp }).sort({ _id: -1 }).limit(1);

  if (transacademia.phoneAccount !== "default") {

    if (transacademia.phonePayment == "default") {
      const update = { phonePayment: phone };
      const result = await Transacademia.updateOne(transacademia, update);
      const dataResponse = {
        msg: "phonePayment",
        data: []
      };
      return res.status(201).send({
        message: "update  Academia datas successfully",
        data: dataResponse,
      });
    }

  } else {
    const update = { phoneAccount: phone };
    const result = await Transacademia.updateOne(transacademia, update);

    // search STDTAC 
    const numberWithout243 = phone.substring(3);


    try {
      let data = new FormData();
      data.append('phone', "0" + numberWithout243);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://tag.trans-academia.cd/ztest.php',
        headers: {
          ...data.getHeaders()
        },
        data: data
      };

      const response = await axios(config);
      console.log(JSON.stringify(response.data));


      const transacademiaSTDTAC = await Transacademia.findOne({ phoneAccount: phone }).sort({ _id: -1 }).limit(1);
      const updateSTDTAC = { stdTac: response.data.status == 400 ? "default" : response.data.donnees[0].id };
      await Transacademia.updateOne(transacademiaSTDTAC, updateSTDTAC);

      const dataResponse = {
        msg: "phoneAccount",
        data: response.data.status == 400 ? {
          "msg": "Données récupérées",
          "status": 400
        } : response.data,
      };

      return res.status(201).send({
        message: "update  Academia datas successfully",
        data: dataResponse,
      });





    } catch (error) {
      console.error(error);
    }






  }

};


module.exports.updatefetcSTDTAC = async (req, res) => {
  const {
    phoneWhatsapp,
  } = req.body;

  const transacademia = await Transacademia.findOne({ phoneWhatsapp }).sort({ _id: -1 }).limit(1);

  return res.status(201).send({
    message: "update  Academia datas successfully",
    data: transacademia,
  });

};





module.exports.getAllTransacademia = async (req, res) => {
  const result = await Transacademia.find();
  return res.status(200).send(result);
};
