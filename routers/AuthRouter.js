const router = require('express').Router();


const {
  Register,
  Login,
  GetAllUser,
  UpdateAdmin,
} = require("../controllers/AuthController");

//Routers

router.route('/').get(Login).post(Register).patch(UpdateAdmin);
router.route('/all').get(GetAllUser);

module.exports = router;