const Subscribers = require('../../Subscriber/models/subscriberModel')

const getTodayBirthdaySubscribers = async () => {
    try{
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const subs =  await Subscribers.find(
            {
                $expr: {
                    $and:
                        [
                            { $eq:[{$month: "$dob"}, month ] },
                            { $eq: [{ $dayOfMonth: "$dob" }, day ]}

                        ]
                    }
                }
            );
            return subs
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports = getTodayBirthdaySubscribers