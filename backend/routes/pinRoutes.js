const router = require('express').Router();
const pinController = require('../controller/pinController');

router.get('/pins', pinController.getAllPins);
router.post('/create-new-pin', pinController.createPin);
router.get('/:id', pinController.getSinglePin);
router.put('/:id', pinController.updatePin);
router.delete('/:id', pinController.deletePin);
router.put('/:id', pinController.updateLike);

module.exports = router; 