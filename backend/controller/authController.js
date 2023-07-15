const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
  const errors = validationResult(req);
  const { username, password } = req.body;
  console.log(username, password);
  return res.status(201).json({success: 'login'});
};

exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  const { username, name, password, email } = req.body;
  console.log(username, name, email, password);
  return res.status(201).json({success: 'signup'});
};