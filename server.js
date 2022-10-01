require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./models");

//Routers
const authRouter = require('./routers/AuthRouter');
const appointmentRouter = require('./routers/AppointmentRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/appointment", appointmentRouter);
app.get('/', (req, res) => res.send('Home'));

//Starting the port
const PORT = process.env.PORT || 5000;
db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});




