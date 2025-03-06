const Subscriber = require('../../Subscriber/models/subscriberModel')

const getTodayBirthdaySubscribers = async () => {
    try {
        const today = new Date();
        const month = today.getMonth() + 1; // Months are zero-based
        const day = today.getDate();

        const subscribers = await Subscriber.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$dob" }, month] },
                    { $eq: [{ $dayOfMonth: "$dob" }, day] },
                ],
            },
        });

        console.log("📡 Found subscribers:");
        return subscribers || [];
    } catch (error) {
        console.error("❌ Error fetching subscribers:", error);
        return []; // Return an empty array to prevent undefined errors
    }
};

module.exports = getTodayBirthdaySubscribers;
