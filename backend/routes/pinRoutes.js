const router = require('express').Router();
const pinController = require('../controller/pinController');

router.get('/pins', pinController.getAllPins);
router.get('/saves', pinController.getSaves);
router.get('/:id', pinController.getSinglePin);
router.post('/create-new-pin', pinController.createPin);
router.post('/comment/:id', pinController.createComment);
router.put('/save/:id', pinController.updatePinSaves);
router.put('/:id', pinController.updatePin);
router.put('/comment/likes/:id', pinController.updateCommentLike);
router.put('/likes/:id', pinController.updatePinLike);
router.put('/comment/:id', pinController.updateCommentLike);
router.delete('/:id', pinController.deletePin);
router.delete('/comment/:id', pinController.deleteComment);

module.exports = router;