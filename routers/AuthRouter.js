const router = require('express').Router();


const { Register, Login } = require('../controllers/AuthController');

//Routers

router.route('/').get(Login).post(Register);

module.exports = router;