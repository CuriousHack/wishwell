const express = require('express');
const schedule = require('node-schedule');
const getAndSendMail = require('./Mailer/controllers/mailerController');
const connectDb = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 9005;


// Connect to the database and start the cron job
const startCron = async () => {
    try {
        await connectDb(); // Ensure MongoDB is connected before starting the cron job
        console.log('✅ Database connected.');

        // Schedule the cron job
        schedule.scheduleJob('0 7 * * *', async function () {
            console.log('⏳ Running scheduled email job...');

            try {
                await getAndSendMail();
                console.log('✅ Email job completed.');
            } catch (error) {
                console.error('❌ Error in scheduled job:', error);
            }
        });

        console.log('🚀 Cron job scheduled.');

    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1); // Exit process if the server fails to start
    }
};
//the code above is a tested and verified code for execution of cron job at exactly 0700am everyday
//and executing the getAndSendMail function. Render doesn't support background processes as it's part of their paid plan
//thus the outsourcing of the process to an external party and consumed through API. Apologies for any inconvienience.

const manualExecution = async () => {
    try {
        await getAndSendMail();
        console.log('✅ Email job completed.');
    } catch (error) {
        console.error('❌ Error in scheduled job:', error);
    }
};

module.exports = {
    startCron,
    manualExecution
}
