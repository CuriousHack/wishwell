const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./utils/db');
const router = require('./Mailer/routes/mailerRoutes');
const subscribeRoute = require('./Subscriber/routes/subscriberRoutes');
const consumeQueue = require('./consumer');
const cronJob = require('./cron');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

//middlewares
app.use(cors({ origin: "*" }));
app.set("trust proxy", true);
app.use(express.json());

//routes
app.get('/', (req, res) => {
    console.log('App stil running ')
    res.end();
})
app.use('/subscribe', subscribeRoute);
//api endpoint for external cron execution
app.get('/start-cron', (req, res) => {
    cronJob.manualExecution();
    res.end();

})

connectDb();

//processes
consumeQueue();

//comment out to use internal cron process
// cronJob.startCron();


app.listen(PORT, () => {
    console.log(`app is listening on PORT ${PORT}`);
})