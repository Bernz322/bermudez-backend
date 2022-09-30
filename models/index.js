const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

//Connecting to mySQL using sequelize
  const sequelize = new Sequelize(
    process.env.DB_NAME_PRODUCTION,
    process.env.DB_USER_PRODUCTION,
    process.env.DB_PASS_PRODUCTION,
    {
      host: process.env.DB_HOST_PRODUCTION,
      dialect: "mysql",
    }
  );

//Verifying if the sequelize is connected successfully
sequelize.authenticate().then(()=> console.log('Connected Successfully')).catch((err) => console.log(err));

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.auth = require('./AuthModel')(sequelize, DataTypes);
db.appointment = require('./AppointmentModel')(sequelize, DataTypes);

// db.appointment.sync({ force: true }).then(() => console.log("Drop and re-sync db"));

module.exports = db;



