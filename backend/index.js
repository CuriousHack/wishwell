const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDb = require('./utils/db');
// const router = require('./Mailer/routes/mailerRoutes')
const subscribeRoute = require('./Subscriber/routes/subscriberRoutes');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;


app.use(cors());
app.use(express.json());
app.use('/send-email', router);
app.use('/subscribe', subscribeRoute);

connectDb();

app.listen(PORT, () => {
    console.log(`app is listening on PORT ${PORT}`);
})