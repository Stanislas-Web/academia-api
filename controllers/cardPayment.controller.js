const bcrypt = require("bcrypt");

const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

module.exports.cardPayment = async (req, res) => {

    const items = [
        {
            amount: req.body.amount,
            phone: req.body.phone,
            quantity: 1
        }

    ];
    
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",
            line_items: items.map(item => {
                return{
                    price_data:{
                        currency:"usd",
                        product_data:{
                            name: "Recharger votre compte"
                        },
                        unit_amount: (item.amount)*100,

                    },
                    quantity: item.quantity
                }
            }),
            success_url: 'http://127.0.0.1:8000/success',
            cancel_url: 'http://127.0.0.1:8000/cancel'
        })

        res.json({url: session.url})

    }catch(e){
     res.status(500).json({error:e.message})
    }
};

module.exports.verifyOtp = async (req, res) => {
  const user = await User.findOne({ number: req.body.number });
  console.log(user);
  if (user) {
    // OTP Login
    const otpHolder = await Otp.find({
      number: req.body.number,
    });
    if (otpHolder.length === 0)
      return res.status(400).send("You use an Expired OTP");
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.number === req.body.number && validUser) {
      const result = await User.findOne({ number: req.body.number });
      return res.status(200).send({
        message: "User login Successfully",
        data: result,
        token: jwt.sign(
          { name: result.name, number: result.number, _id: result._id },
          "RESTFULAPIs"
        ),
      });
    } else {
      return res.status(400).send("Your OTP is Wrong");
    }
  } else {
    // OTP SIGNUP
    const otpHolder = await Otp.find({
      number: req.body.number,
    });
    if (otpHolder.length === 0)
      return res.status(400).send("You use an Expired OTP");
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.number === req.body.number && validUser) {
      const user = new User({
        number: req.body.number,
        name: rightOtpFind.name,
      });
      const result = await user.save();
      const OTPDelete = await Otp.deleteMany({ number: rightOtpFind.number });
      return res.status(200).send({
        message: "User Registration Successfully",
        data: result,
        token: jwt.sign(
          { name: result.name, number: result.number, _id: result._id },
          "RESTFULAPIs"
        ),
      });
    } else {
      return res.status(400).send("Your OTP is Wrong");
    }
  }
};

module.exports.login = async (req, res) => {
  const password = req.body.password;
  const number = req.body.number;
  const checkNumber = await User.findOne({ number: number});
  if (checkNumber) {
    const checkPassword = await bcrypt.compare(password, checkNumber.password);
    if (checkPassword) {
        return res.status(200).send({
            message: "User login Successfully",
            data: checkNumber,
            token: jwt.sign(
              { name: checkNumber.name, number: checkNumber.number, _id: checkNumber._id },
              "RESTFULAPIs"
            ),
          });
        
    } else {
        return res.status(400).send({message:"Numéro de téléphone ou mot de passe incorrecte"});
        
    }
  } else {
    return res.status(400).send({message:"Numéro de téléphone ou mot de passe incorrecte" });
  }
};

module.exports.hello = async (req, res) => {
 
  return res.status(200).send({
    message: "Api Rest Bantou - store"
  });
};