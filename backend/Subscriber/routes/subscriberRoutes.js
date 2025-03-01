const express = require('express');
const emailLimiter = require('../../utils/rateLimit')
const subscriberController = require('../controllers/subscriberController')
const validateSubscription = require('../middlewares/subscriberValidator')

const router = express.Router();

router.post('/', emailLimiter, validateSubscription, subscriberController.newSubscriber)

module.exports = router