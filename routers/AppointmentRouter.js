const router = require('express').Router();

const {
  AppointmentCreation,
  AppointmentGetByUser,
  DeleteAppointmentByUser,
  GetAllAppointment,
  UpdateAppointment,
} = require("../controllers/AppointmentController");

//Routers
router
  .route("/")
  .get(GetAllAppointment)
  .post(AppointmentCreation)
  .patch(UpdateAppointment);
router.route('/:id').delete(DeleteAppointmentByUser);
router.route('/find').get(AppointmentGetByUser);


module.exports = router;