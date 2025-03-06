const getTodayBirthdaySubscribers = require("../services/getAllSubscribers");
const sendToQueue = require("../services/queueMailService");

const subscribers = async (req, res) => {
    try {
        const newSubs = await getTodayBirthdaySubscribers();

        if (!Array.isArray(newSubs) || newSubs.length === 0) {
            console.log("⚠ No subscribers found today.");
        }
        newSubs.forEach((subscriber) => {
            const emailData = {
                username: subscriber.username,
                email: subscriber.email,
            };
            sendToQueue(emailData);
            // console.log(emailData);
        });
    } catch (error) {
        console.error("❌ Error in subscribers controller:", error);
    }
};

module.exports = subscribers;
