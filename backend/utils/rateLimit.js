const rateLimit = require('express-rate-limit')

const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: { success: false, message: "Yo! Trying to subscribe multiple times? 😅 Give it a breather and try again later!" },
});

module.exports = emailLimiter