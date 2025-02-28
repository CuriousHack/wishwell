const express = require('express');
const emailLimiter = require('../../utils/rateLimit')
const subscriberController = require('../controllers/subscriberController')

const router = express.Router();

router.post('/', emailLimiter, subscriberController.newSubscriber)

module.exports = router