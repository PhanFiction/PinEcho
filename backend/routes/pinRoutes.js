const router = require('express').Router();
const pinController = require('../controller/pinController');

router.post('/create-new-pin', pinController.createPin);
router.get('/:id', pinController.getPin);
router.put('/:id', pinController.updatePin);

module.exports = router; 