const db = require('../models');
const Appointment = db.appointment;
const { Op } = require('sequelize');

//Create Appointment
const AppointmentCreation = async (req, res)=>{
    try {
        const createAppointment = await Appointment.create(req.body);
        res.status(200).json(createAppointment);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Get Appointment by User
const AppointmentGetByUser = async (req, res)=>{
    try {
        const getAppointment = await Appointment.findAll({
          where: {
            [Op.and]: [
              { ClientFirstname: req.query.firstname },
              { ClientMiddlename: req.query.middlename },
              { ClientLastname: req.query.lastname },
            ],
          },
        });

        const getAppointmentSort = getAppointment.sort((a,b)=> a.createdAt - b.createdAt);

        res.status(200).json(getAppointmentSort)
    } catch (error) {
        res.status(500).json(error)
    }
}

//Delete Appointment by User or Admin
const DeleteAppointmentByUser = async (req, res)=>{
    try {
        const deleteAppointment = await Appointment.destroy({
            where:{
                id: req.params.id,
            }
        });
        res.status(200).json(deleteAppointment)
    } catch (error) {
        res.status(500).json(error)
    }
}

//Get All by Admin
const GetAllAppointment = async (req, res)=>{
    try {
        const getallappointment = await Appointment.findAll();
        const getallsort = getallappointment.sort((a,b)=> a.createdAt - b.createdAt)
        res.status(200).json(getallsort);
    } catch (error) {
        res.status(500).json(error);
    }
}


//Update by Admin

const UpdateAppointment = async (req, res)=>{
    const newbody = req.body
    try {
        const updateAppointment = await Appointment.update(newbody, {
          where: {
            id: req.query.id,
          },
        });
        res.status(200).json(newbody);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
  AppointmentCreation,
  AppointmentGetByUser,
  DeleteAppointmentByUser,
  GetAllAppointment,
  UpdateAppointment,
};


