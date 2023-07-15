const router = require('express').Router();
const authController = require('../controller/authController');
const validateServices = require('../utils/validate');

router.post('/login', authController.login);
router.post('/signup', validateServices.validateUser, authController.signUp);

module.exports = router;