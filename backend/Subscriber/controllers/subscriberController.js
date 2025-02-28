const { newSubscriberService } = require('../services/subscriberService')
const newSubscriber = async (req, res) => {
    try{
        const { username, email, dob } = req.body;
        const response = await newSubscriberService(username, email, dob)
        res.status(201).json({ success: true, message: response.data});
    }
    catch(err){
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
}

module.exports = {
    newSubscriber
}