const router = require('express').Router();
const pinController = require('../controller/pinController');

router.post('/create-new-pin', pinController.createPin);

module.exports = router; 