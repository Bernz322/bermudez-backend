const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();



//Routers
const authRouter = require('./routers/AuthRouter');
const appointmentRouter = require('./routers/AppointmentRouter')



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/api/auth", authRouter);
app.use("/api/appointment", appointmentRouter);
app.get('/', (req, res) => res.send('Home'))

//Starting the port
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server is listening on port ${port}`));




