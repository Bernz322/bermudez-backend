const db = require('../models')
const Auth = db.auth;
const cryptoJS = require('crypto-js');
require('dotenv').config();


const Register = async (req, res)=>{
    try {
        const registerUser = await Auth.create({
          firstname: req.body.firstname,
          middlename: req.body.middlename,
          lastname: req.body.lastname,
          username: req.body.username,
          password: cryptoJS.AES.encrypt(
            req.body.password,
            process.env.CRYPTO_PASS
          ).toString(),
          birthday: req.body.birthday,
          sex: req.body.sex,
          address: req.body.address,
          occupation: req.body.occupation,
          nearestKin: req.body.nearestKin,
          relationship: req.body.relationship,
          occupation2: req.body.occupation2,
          img: req.body.img,
        });


        res.status(200).json(registerUser);

    } catch (error) {
        res.status(500).json(error)
    }
}


const Login = async (req, res)=>{
    try {
        const loginUser = await Auth.findOne({
          //find the data if the username matches
          where: {
            username: req.query.username,
          },
        });

        if(loginUser){
            const PasswordDecrypt = cryptoJS.AES.decrypt(
              //decrypt the password of found data
              loginUser.password,
              process.env.CRYPTO_PASS
            );

            const InputPassword = PasswordDecrypt.toString(cryptoJS.enc.Utf8);
            if(InputPassword === req.query.password){
              const { password, ...others } = loginUser.dataValues;
              return res.status(200).json({ ...others }); //to hide the password
            }else{
              return res.status(500).json("Wrong Credentials");
            }
        }else{
            return res.status(500).json("Account doesn't exist");
        }
    
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {Login, Register};
