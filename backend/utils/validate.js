const { body, validationResult } = require('express-validator');

const checkCredentials = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('name').notEmpty().withMessage('Name is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// middleware to check username, name, password, and email for incoming request
const validateIncomingRequest = (req, res) => {
  checkCredentials(req, res, () => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.send({error: errors.array()});
  })
};

module.exports = validateIncomingRequest;