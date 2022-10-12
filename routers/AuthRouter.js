const router = require('express').Router();


const {
  Register,
  Login,
  GetAllUser,
  UpdateAdmin,
  AuthGetByUser,
} = require("../controllers/AuthController");

//Routers

router.route('/').get(Login).post(Register).patch(UpdateAdmin);
router.route('/find').get(AuthGetByUser)
router.route('/all').get(GetAllUser);

module.exports = router;