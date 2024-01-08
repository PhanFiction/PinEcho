const router = require('express').Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const validateServices = require('../utils/validate');

router.post('/login', validateServices.validateLoginCredentials, authController.login);
router.post('/signup', validateServices.validateSignUpCredentials, authController.signUp);
router.get('/user', userController.getUser);
router.get('/users', userController.getUsers);
router.get('/logout', authController.logout);

module.exports = router;