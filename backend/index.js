const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./utils/db');
const router = require('./Mailer/routes/mailerRoutes');
const subscribeRoute = require('./Subscriber/routes/subscriberRoutes');
const consumeQueue = require('./consumer');
const startCron = require('./cron');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

//middlewares
app.use(cors({ origin: "*" }));
app.set("trust proxy", true);
app.use(express.json());

//routes
// app.use('/send-email', router);
app.use('/subscribe', subscribeRoute);

connectDb();

//processes
consumeQueue();
startCron();


app.listen(PORT, () => {
    console.log(`app is listening on PORT ${PORT}`);
})