const schedule = require('node-schedule');
const getAndSendMail = require('./Mailer/controllers/mailerController');
const connectDb = require('./utils/db');

const startCron = async () => {
    await connectDb(); // Ensure MongoDB is connected before starting the cron job

    schedule.scheduleJob('30 9 * * *', async function () {
        console.log('⏳ Running scheduled email job...');

        try {
            await getAndSendMail();
            console.log('✅ Email job completed.');
        } catch (error) {
            console.error('❌ Error in scheduled job:', error);
        }
    });

    console.log('🚀 Cron job scheduled.');
};

startCron();
