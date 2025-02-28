const Subscriber = require('../models/subscriberModel')
const { error } = require('../../utils/helpers');
const newSubscriberService = async (username, email, dob) => {

    //confirm if email doesn't exist
    const subscriberExist = await Subscriber.findOne({ email });
    if(subscriberExist) error(401, 'Subscriber already exist!')
    
    //add the subscriber information into the database
    try{
        await Subscriber.create({ username, email, dob });
        return({ data: "Boom! Your details are in. Thanks a bunch! 🚀"})
    }
    catch(err){
        error(500, err.message);
    }
    

}

module.exports = {
    newSubscriberService
}