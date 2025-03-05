const express = require('express');
const subscriberController = require('../controllers/mailerController')

const router = express.Router();
router.get('/',  subscriberController);

module.exports = router