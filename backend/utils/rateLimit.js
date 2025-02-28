const rateLimit = require('express-rate-limit')

const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: { success: false, message: "Too many requests. Try again later." },
});

module.exports = emailLimiter