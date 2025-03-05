const getTodayBirthdaySubscribers = require('../services/getAllSubscribers')
const sendToQueue = require('../services/queueMailService')


//get all users that hsve birthday today
const subscribers = async (req, res) => {
    const newSubs = await getTodayBirthdaySubscribers()

    //queue them up for email sending
    newSubs.forEach(subscriber => {
        const emailData = {
            username: subscriber.username,
            email: subscriber.email
        }
        sendToQueue(emailData);
        console.log(emailData);
        
    });
    res.status(200).json({data: newSubs})
}

module.exports = subscribers
