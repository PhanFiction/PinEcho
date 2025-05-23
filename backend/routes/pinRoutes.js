const router = require('express').Router();
const pinController = require('../controller/pinController');
const middleware = require('../middleware/middleware');

router.get('/', pinController.getAllPins);
router.get('/:id', pinController.getSinglePin);

// User needs to be logged in to get their pins, update, delete, or create a pin
router.get('/saves', middleware.extractToken, pinController.getSaves);
router.post('/create-new-pin', middleware.extractToken, pinController.createPin);
router.post('/comment/:id', middleware.extractToken, pinController.createComment);
router.put('/save/:id', middleware.extractToken, pinController.updatePinSaves);
router.put('/:id', middleware.extractToken, pinController.updatePin);
router.put('/comment/likes/:id', middleware.extractToken, pinController.updateCommentLike);
router.put('/likes/:id', middleware.extractToken, pinController.updatePinLike);
router.put('/comment/:id', middleware.extractToken, pinController.updateCommentLike);
router.delete('/:id', middleware.extractToken, pinController.deletePin);
router.delete('/comment/:id', middleware.extractToken, pinController.deleteComment);

module.exports = router;