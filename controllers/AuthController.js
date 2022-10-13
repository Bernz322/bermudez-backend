const db = require('../models')
const Auth = db.auth;
const cryptoJS = require('crypto-js');
require('dotenv').config();
const { Op } = require("sequelize");

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

const GetAllUser = async (req, res)=>{
  try {
    const getAll = await Auth.findAll();
    res.status(200).json(getAll);
  } catch (error) {
    res.status(500).json(error);
  }
}

const UpdateAdmin = async (req, res)=>{
  const newbody = req.body;
  try {
    const updateAppointment = await Auth.update(newbody, {
      where: {
        id: req.query.id,
      },
    });
     res.status(200).json(newbody);
  } catch (error) {
      res.status(500).json(error);
  }
}


//Get Auth by User
const AuthGetByUser = async (req, res)=>{
    try {
        const getAuth = await Auth.findAll({
          where: {
            [Op.and]: [
              { firstname: req.query.firstname },
              { middlename: req.query.middlename },
              { lastname: req.query.lastname },
            ],
          },
        });

        res.status(200).json(getAuth);
    } catch (error) {
        res.status(500).json(error)
    }
}






module.exports = {
  Login,
  Register,
  GetAllUser,
  UpdateAdmin,
  AuthGetByUser,
};
